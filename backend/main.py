# Dokyeong_Homepage/backend/main.py
import os
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.responses import HTMLResponse
from dotenv import load_dotenv
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime

# .env 파일 로드 (환경 변수 사용을 위함)
load_dotenv()

# FastAPI 애플리케이션 인스턴스 생성
app = FastAPI(
    title="Dokyeongyeom's Personal Website Backend",
    description="Backend API for managing website content (Works, Blog) and AI experiments (Labs).",
    version="0.0.1",
    docs_url="/docs",  # Swagger UI 경로
    redoc_url="/redoc" # ReDoc 경로
)

# 데이터베이스 설정
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable not set. Please create a .env file with DATABASE_URL.")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# 데이터베이스 세션 의존성 주입
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ==== 데이터베이스 모델 정의 ====
# Works 모델 (내가 했던 일들)
class Work(Base):
    __tablename__ = "works"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    image_url = Column(String, nullable=True)
    project_url = Column(String, nullable=True)
    tags = Column(String, nullable=True) # 콤마로 구분된 태그
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

# Blog 모델 (인사이트)
class Blog(Base):
    __tablename__ = "blogs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    author = Column(String, default="Dokyeongyeom")
    tags = Column(String, nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

# 사용자 계정 모델 (관리자 페이지)
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    email = Column(String, unique=True, index=True, nullable=True)
    is_active = Column(Integer, default=1) # 1: active, 0: inactive
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())


# ==== 데이터베이스 테이블 생성 ====
# 애플리케이션 시작 시 테이블이 없으면 생성
@app.on_event("startup")
def on_startup():
    try:
        Base.metadata.create_all(bind=engine)
        print("Database tables created/checked successfully.")
    except Exception as e:
        print(f"Error creating database tables: {e}")
        # 실제 배포 환경에서는 서버를 종료하거나 더 강력한 로깅 필요
        # raise Exception("Failed to connect to database on startup.")


# ==== API 엔드포인트 정의 ====

@app.get("/", response_class=HTMLResponse, summary="Root endpoint")
async def read_root():
    return """
    <html>
        <head>
            <title>Dokyeongyeom's Personal Website Backend</title>
        </head>
        <body>
            <h1>Welcome to Dokyeongyeom's Personal Website Backend!</h1>
            <p>This is the API backend for your personal website.</p>
            <ul>
                <li>Check <a href="/docs">Swagger UI</a> for API documentation.</li>
                <li>Check <a href="/redoc">ReDoc</a> for alternative API documentation.</li>
                <li>Check <a href="/health">/health</a> endpoint for server status.</li>
            </ul>
        </body>
    </html>
    """

@app.get("/health", summary="Health Check")
async def health_check():
    """Checks the health of the API and database connection."""
    try:
        with engine.connect() as connection:
            connection.execute(func.now()) # 간단한 쿼리로 DB 연결 테스트
        return {"status": "ok", "database_connection": "successful"}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Database connection failed: {str(e)}")

# 예시: Works 목록 조회 (CRUD의 Read)
@app.get("/works/", summary="Get all Works", response_model=list[dict])
async def get_works(db: Session = Depends(get_db)):
    works = db.query(Work).all()
    # Pydantic 모델을 사용하여 응답 스키마 정의를 하는 것이 더 좋습니다 (다음 단계에서).
    # 여기서는 간단히 dict 형태로 반환합니다.
    return [{"id": w.id, "title": w.title, "description": w.description} for w in works]

# 예시: Blog 목록 조회 (CRUD의 Read)
@app.get("/blogs/", summary="Get all Blogs", response_model=list[dict])
async def get_blogs(db: Session = Depends(get_db)):
    blogs = db.query(Blog).all()
    return [{"id": b.id, "title": b.title, "content": b.content} for b in blogs]

# TODO: 추후 User, Works CRUD, Blog CRUD, Labs 관련 API 추가 예정
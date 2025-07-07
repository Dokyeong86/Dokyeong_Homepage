# Dokyeong_Homepage/backend/main.py
import os
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.responses import HTMLResponse
from dotenv import load_dotenv
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel, EmailStr
from typing import Optional, List # List 추가
from datetime import datetime

# --- ADD THIS IMPORT ---
from fastapi.middleware.cors import CORSMiddleware

# .env 파일 로드 (환경 변수 사용을 위함)
load_dotenv()

# FastAPI 애플리케이션 인스턴스 생성
app = FastAPI(
    title="Dokyeongyeom's Personal Website Backend",
    description="Backend API for managing website content (Works, Blog) and AI experiments (Labs).",
    version="0.0.1",
    docs_url="/docs", # Swagger UI 경로
    redoc_url="/redoc" # ReDoc 경로
)

# --- ADD THIS CORS CONFIGURATION ---
origins = [
    "http://localhost:3000",  # Next.js 개발 서버 주소
    "http://127.0.0.1:3000",
    # TODO: Vercel 배포 주소를 여기에 추가해야 합니다!
    # "https://your-vercel-frontend-url.vercel.app",
    # "https://www.yourdomain.com", # 실제 도메인 사용 시
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # 허용할 출처
    allow_credentials=True,      # 쿠키 포함 요청 허용
    allow_methods=["*"],         # 모든 HTTP 메서드 허용
    allow_headers=["*"],         # 모든 HTTP 헤더 허용
)
# ------------------------------------

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


# ==== Pydantic 스키마 정의 ====

# Work 스키마
class WorkBase(BaseModel):
    title: str
    description: str
    image_url: Optional[str] = None
    project_url: Optional[str] = None
    tags: Optional[str] = None # 콤마로 구분된 문자열

class WorkCreate(WorkBase):
    pass # 생성 시에는 Base와 동일

class WorkUpdate(WorkBase):
    # 업데이트 시 모든 필드가 필수는 아님
    title: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    project_url: Optional[str] = None
    tags: Optional[str] = None

class WorkResponse(WorkBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True # SQLAlchemy 모델과 호환되도록 설정 (Pydantic V2)

# Blog 스키마
class BlogBase(BaseModel):
    title: str
    content: str
    author: Optional[str] = "Dokyeongyeom"
    tags: Optional[str] = None

class BlogCreate(BlogBase):
    pass

class BlogUpdate(BlogBase):
    title: Optional[str] = None
    content: Optional[str] = None
    author: Optional[str] = None
    tags: Optional[str] = None

class BlogResponse(BlogBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# User 스키마 (관리자용)
class UserBase(BaseModel):
    username: str
    email: Optional[EmailStr] = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

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
    __tablename__ = "blogs" # Make sure this matches your DB table name
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    author = Column(String, default="Dokyeongyeom")
    tags = Column(String, nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

# 사용자 계정 모델 (관리자 페이지)
class User(Base):
    __tablename__ = "users" # Make sure this matches your DB table name
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

# --- REMOVE THESE DUPLICATE ENDPOINTS ---
# @app.get("/works/", summary="Get all Works", response_model=list[dict])
# async def get_works(db: Session = Depends(get_db)):
#     works = db.query(Work).all()
#     return [{"id": w.id, "title": w.title, "description": w.description} for w in works]

# @app.get("/blogs/", summary="Get all Blogs", response_model=list[dict])
# async def get_blogs(db: Session = Depends(get_db)):
#     blogs = db.query(Blog).all()
#     return [{"id": b.id, "title": b.title, "content": b.content} for b in blogs]
# ----------------------------------------


# Works - Read all
@app.get("/works/", response_model=List[WorkResponse], summary="Get all Works")
async def get_all_works(db: Session = Depends(get_db)):
    works = db.query(Work).all()
    return works

# Works - Read by ID
@app.get("/works/{work_id}", response_model=WorkResponse, summary="Get Work by ID")
async def get_work(work_id: int, db: Session = Depends(get_db)):
    work = db.query(Work).filter(Work.id == work_id).first()
    if not work:
        raise HTTPException(status_code=404, detail="Work not found")
    return work

# Works - Create
@app.post("/works/", response_model=WorkResponse, status_code=status.HTTP_201_CREATED, summary="Create a new Work")
async def create_work(work: WorkCreate, db: Session = Depends(get_db)):
    db_work = Work(**work.model_dump()) # Pydantic v2
    db.add(db_work)
    db.commit()
    db.refresh(db_work)
    return db_work

# Works - Update
@app.put("/works/{work_id}", response_model=WorkResponse, summary="Update an existing Work")
async def update_work(work_id: int, work: WorkUpdate, db: Session = Depends(get_db)):
    db_work = db.query(Work).filter(Work.id == work_id).first()
    if not db_work:
        raise HTTPException(status_code=404, detail="Work not found")

    for field, value in work.model_dump(exclude_unset=True).items():
        setattr(db_work, field, value)

    db.add(db_work)
    db.commit()
    db.refresh(db_work)
    return db_work

# Works - Delete
@app.delete("/works/{work_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete a Work")
async def delete_work(work_id: int, db: Session = Depends(get_db)):
    db_work = db.query(Work).filter(Work.id == work_id).first()
    if not db_work:
        raise HTTPException(status_code=404, detail="Work not found")
    db.delete(db_work)
    db.commit()
    return {"message": "Work deleted successfully"}


# Blog - Read all (Corrected path, model, and summary)
@app.get("/blogs/", response_model=List[BlogResponse], summary="Get all Blogs")
async def get_all_blogs(db: Session = Depends(get_db)):
    blogs = db.query(Blog).all() # Corrected to Blog model
    return blogs

# Blog - Read by ID (Corrected path, model, and summary)
@app.get("/blogs/{blog_id}", response_model=BlogResponse, summary="Get Blog by ID")
async def get_blog(blog_id: int, db: Session = Depends(get_db)):
    blog = db.query(Blog).filter(Blog.id == blog_id).first() # Corrected to Blog model
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found") # Corrected detail message
    return blog

# Blog - Create (Corrected path, model, and summary)
@app.post("/blogs/", response_model=BlogResponse, status_code=status.HTTP_201_CREATED, summary="Create a new Blog")
async def create_blog(blog: BlogCreate, db: Session = Depends(get_db)): # Corrected request body model
    db_blog = Blog(**blog.model_dump()) # Corrected to Blog model
    db.add(db_blog)
    db.commit()
    db.refresh(db_blog)
    return db_blog

# Blog - Update (Corrected path, model, and summary)
@app.put("/blogs/{blog_id}", response_model=BlogResponse, summary="Update an existing Blog")
async def update_blog(blog_id: int, blog: BlogUpdate, db: Session = Depends(get_db)): # Corrected request body model
    db_blog = db.query(Blog).filter(Blog.id == blog_id).first() # Corrected to Blog model
    if not db_blog:
        raise HTTPException(status_code=404, detail="Blog not found") # Corrected detail message

    for field, value in blog.model_dump(exclude_unset=True).items():
        setattr(db_blog, field, value)

    db.add(db_blog)
    db.commit()
    db.refresh(db_blog)
    return db_blog

# Blog - Delete (Corrected path, model, and summary)
@app.delete("/blogs/{blog_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete a Blog")
async def delete_blog(blog_id: int, db: Session = Depends(get_db)):
    db_blog = db.query(Blog).filter(Blog.id == blog_id).first() # Corrected to Blog model
    if not db_blog:
        raise HTTPException(status_code=404, detail="Blog not found") # Corrected detail message
    db.delete(db_blog)
    db.commit()
    return {"message": "Blog deleted successfully"}


# User - Create (비밀번호 해싱은 추후 추가)
@app.post("/users/", response_model=UserResponse, status_code=status.HTTP_201_CREATED, summary="Create a new User")
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    # 실제 서비스에서는 user.password를 해싱해야 합니다!
    hashed_password = user.password # 임시 (TODO: Replace with proper hashing like bcrypt)
    db_user = User(username=user.username, hashed_password=hashed_password, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# User - Read all
@app.get("/users/", response_model=List[UserResponse], summary="Get all Users")
async def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

# User - Read by ID
@app.get("/users/{user_id}", response_model=UserResponse, summary="Get User by ID")
async def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# TODO: User Update, Delete, Password hashing, JWT Authentication and Authorization

# TODO: 추후 User, Blog CRUD, Blog CRUD, Labs 관련 API 추가 예정
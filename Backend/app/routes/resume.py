from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import shutil
from pypdf import PdfReader
from app.services.openai_service import extract_skills

router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    try:
        # Save uploaded file
        file_path = os.path.join(
            UPLOAD_FOLDER,
            os.path.basename(file.filename)
        )

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Read PDF
        reader = PdfReader(file_path)

        text = ""

        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"

        print("\n========== RESUME TEXT ==========")
        print(text[:1500])
        print("=================================\n")

        # AI Extraction
        parsed_data = extract_skills(text)

        return {
            "filename": file.filename,
            "candidate_name": parsed_data.get("name", ""),
            "skills": parsed_data.get("skills", [])
        }

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Resume processing failed: {str(exc)}"
        )
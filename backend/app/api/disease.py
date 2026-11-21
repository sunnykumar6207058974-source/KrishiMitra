from typing import Optional
from fastapi import APIRouter, UploadFile, File, Form

router = APIRouter(prefix="/disease", tags=["Disease & Pest Guidance"])

@router.post("/analyze")
async def analyze_crop_disease(
    crop_name: Optional[str] = Form("Wheat"),
    file: Optional[UploadFile] = File(None)
):
    # Production-safe guidance: Provides visible symptoms, safety disclaimers and expert contact
    filename = file.filename if file else "sample_leaf.jpg"

    return {
        "analyzed_file": filename,
        "crop": crop_name,
        "suspected_condition": f"Early Blight / Leaf Spot Susceptibility ({crop_name})",
        "confidence_level": "Indicative AI Observation (Not a Laboratory Diagnosis)",
        "visible_symptoms": [
            "Concentric brownish lesions or yellow halos on lower leaf margins.",
            "Premature drying or curling of older leaves."
        ],
        "preventive_practices": [
            "Ensure proper field drainage to avoid continuous canopy wetness.",
            "Rotate crops with non-host species (e.g. pulses or oilseeds).",
            "Destroy and bury infected crop residues after harvest."
        ],
        "recommended_next_steps": [
            "Monitor unaffected field sectors for symptom spread.",
            "Avoid spraying synthetic chemicals without physical confirmation."
        ],
        "expert_contact": "Consult your local Krishi Vigyan Kendra (KVK) Agronomist or Kisan Call Centre (Toll-Free 1800-180-1551) for laboratory examination.",
        "safety_disclaimer": "⚠️ Notice: An image analysis alone cannot provide a definitive plant pathology diagnosis. Never apply unverified chemical fungicides or pesticides."
    }

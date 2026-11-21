from datetime import datetime
from app.database.session import engine, SessionLocal, Base
from app.models.entities import (
    User, FarmerProfile, Farm, Crop, MandiPrice, KnowledgeSource, AdvisoryRecord
)
from app.core.security import get_password_hash

def init_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # 1. Seed Demo Farmer if not present
    demo_user = db.query(User).filter(User.mobile_number == "9876543210").first()
    if not demo_user:
        demo_user = User(
            full_name="Ramesh Chandra Patel",
            mobile_number="9876543210",
            email="ramesh.patel@krishimitra.org",
            hashed_password=get_password_hash("Kisan@2026"),
            state="Maharashtra",
            district="Pune",
            preferred_language="en",
            is_active=True
        )
        db.add(demo_user)
        db.commit()
        db.refresh(demo_user)

        # Farmer Profile
        profile = FarmerProfile(
            user_id=demo_user.id,
            farm_name="Patel Agro Farm",
            total_land_area=4.5,
            land_unit="Acres",
            primary_soil_type="Medium Black / Loamy",
            irrigation_source="Canal & Drip Irrigation",
            experience_years=12,
            bio="Dedicated progressive farmer practicing mixed cropping with focus on pulses and cereals."
        )
        db.add(profile)

        # Registered Farm
        farm = Farm(
            user_id=demo_user.id,
            farm_name="Patel Agro Farm - South Plot",
            state="Maharashtra",
            district="Pune",
            village="Haveli",
            land_size=4.5,
            land_unit="Acres",
            soil_type="Black Clayey Loam",
            irrigation_available=True,
            primary_crops="Wheat, Chickpea, Soybean"
        )
        db.add(farm)
        db.commit()

    # 2. Seed Standard Crops reference
    crops_data = [
        {"name": "rice", "scientific_name": "Oryza sativa", "category": "Cereal", "optimal_temp_min": 20.0, "optimal_temp_max": 35.0, "optimal_rainfall_min": 150.0, "optimal_rainfall_max": 300.0, "optimal_ph_min": 5.5, "optimal_ph_max": 7.5, "season_type": "Kharif", "description": "High water requiring staple cereal ideal for clayey soils with water retention."},
        {"name": "wheat", "scientific_name": "Triticum aestivum", "category": "Cereal", "optimal_temp_min": 12.0, "optimal_temp_max": 25.0, "optimal_rainfall_min": 75.0, "optimal_rainfall_max": 100.0, "optimal_ph_min": 6.0, "optimal_ph_max": 7.5, "season_type": "Rabi", "description": "Major winter staple requiring cool growing season and dry harvest climate."},
        {"name": "maize", "scientific_name": "Zea mays", "category": "Cereal", "optimal_temp_min": 18.0, "optimal_temp_max": 30.0, "optimal_rainfall_min": 60.0, "optimal_rainfall_max": 120.0, "optimal_ph_min": 5.8, "optimal_ph_max": 7.5, "season_type": "Kharif", "description": "Versatile cereal needing well-drained loamy soil and moderate rainfall."},
        {"name": "chickpea", "scientific_name": "Cicer arietinum", "category": "Pulse", "optimal_temp_min": 15.0, "optimal_temp_max": 28.0, "optimal_rainfall_min": 60.0, "optimal_rainfall_max": 90.0, "optimal_ph_min": 6.0, "optimal_ph_max": 8.0, "season_type": "Rabi", "description": "Protein-rich pulse that enriches soil nitrogen and thrives in residual moisture."},
        {"name": "cotton", "scientific_name": "Gossypium hirsutum", "category": "Cash Crop", "optimal_temp_min": 21.0, "optimal_temp_max": 32.0, "optimal_rainfall_min": 60.0, "optimal_rainfall_max": 110.0, "optimal_ph_min": 6.0, "optimal_ph_max": 8.0, "season_type": "Kharif", "description": "Deep-rooted commercial crop performing best in deep black soils (regur)."},
        {"name": "jute", "scientific_name": "Corchorus capsularis", "category": "Fiber", "optimal_temp_min": 24.0, "optimal_temp_max": 35.0, "optimal_rainfall_min": 150.0, "optimal_rainfall_max": 250.0, "optimal_ph_min": 6.0, "optimal_ph_max": 7.5, "season_type": "Kharif", "description": "Warm, humid climate golden fiber crop typical of eastern Indian river basins."}
    ]

    for c in crops_data:
        existing = db.query(Crop).filter(Crop.name == c["name"]).first()
        if not existing:
            db.add(Crop(**c))
    db.commit()

    # 3. Seed Verified Mandi Prices (Source: AGMARKNET demo benchmark)
    mandi_data = [
        {"state": "Maharashtra", "district": "Pune", "market": "Pune APMC", "commodity": "Wheat", "variety": "Lokwan", "min_price": 2400.0, "max_price": 2850.0, "modal_price": 2650.0, "price_date": "2026-11-20", "source": "AGMARKNET Demo Data"},
        {"state": "Maharashtra", "district": "Pune", "market": "Pune APMC", "commodity": "Gram (Chickpea)", "variety": "Desi", "min_price": 5400.0, "max_price": 6100.0, "modal_price": 5800.0, "price_date": "2026-11-20", "source": "AGMARKNET Demo Data"},
        {"state": "Maharashtra", "district": "Nashik", "market": "Lasalgaon APMC", "commodity": "Onion", "variety": "Red", "min_price": 1800.0, "max_price": 2600.0, "modal_price": 2200.0, "price_date": "2026-11-20", "source": "AGMARKNET Demo Data"},
        {"state": "Punjab", "district": "Ludhiana", "market": "Ludhiana Mandi", "commodity": "Paddy (Dhan)", "variety": "Basmati", "min_price": 3200.0, "max_price": 3950.0, "modal_price": 3600.0, "price_date": "2026-11-20", "source": "AGMARKNET Demo Data"},
        {"state": "Gujarat", "district": "Rajkot", "market": "Rajkot APMC", "commodity": "Cotton", "variety": "Shankar-6", "min_price": 6900.0, "max_price": 7500.0, "modal_price": 7250.0, "price_date": "2026-11-20", "source": "AGMARKNET Demo Data"},
        {"state": "Assam", "district": "Kamrup", "market": "Guwahati Market", "commodity": "Rice", "variety": "Ahu/Sali", "min_price": 2250.0, "max_price": 2600.0, "modal_price": 2400.0, "price_date": "2026-11-20", "source": "AGMARKNET Demo Data"},
    ]

    for m in mandi_data:
        existing = db.query(MandiPrice).filter(
            MandiPrice.market == m["market"],
            MandiPrice.commodity == m["commodity"]
        ).first()
        if not existing:
            db.add(MandiPrice(**m))
    db.commit()

    # 4. Seed Verified ICAR / KVK Knowledge Base for RAG
    knowledge_base = [
        {
            "title": "ICAR Advisory: Soil Nutrient Management for Rabi Crops",
            "document_type": "ICAR Advisory",
            "category": "Soil & Fertilizer",
            "content": "For wheat and chickpea during Rabi season: Test soil pH before basal fertilizer application. Apply full Phosphorus (P) and Potassium (K) dose at sowing. In wheat, split Nitrogen application: 50% at sowing, 25% at first irrigation (crown root initiation, 21 DAS), and 25% at tillering stage. Avoid excessive nitrogen which induces lodging.",
            "reference_url": "https://icar.org.in"
        },
        {
            "title": "Water Management & Critical Irrigation Stages in Cereals",
            "document_type": "KVK Agronomy Bulletin",
            "category": "Irrigation",
            "content": "Wheat requires 4 to 6 irrigations depending on soil type. Crown root initiation (CRI) at 20-25 days after sowing is the most critical stage; water stress at CRI can reduce yield up to 30%. For Chickpea, avoid excessive irrigation; one pre-sowing and one pod-development irrigation is optimal.",
            "reference_url": "https://kvk.icar.gov.in"
        },
        {
            "title": "Integrated Pest Management (IPM) for Legumes and Oilseeds",
            "document_type": "State Agriculture University Guide",
            "category": "Crop Protection",
            "content": "Install bird perches @ 40-50/ha and pheromone traps @ 10/ha for monitoring Helicoverpa armigera (pod borer). Spray Neem seed kernel extract (NSKE 5%) or Bacillus thuringiensis (Bt) at early instar stages before using synthetic chemical alternatives.",
            "reference_url": "https://agricoop.nic.in"
        },
        {
            "title": "Kharif Paddy Nursery and Transplanting Guidelines",
            "document_type": "National Food Security Mission",
            "category": "Crop Production",
            "content": "Sow nursery with 40-50 kg certified seed per hectare. Transplant 21-25 day old seedlings at 2-3 seedlings per hill with 20x15 cm spacing. Maintain shallow water depth (2-3 cm) during vegetative stage and drain field 10 days before harvesting.",
            "reference_url": "https://nfsm.gov.in"
        }
    ]

    for kb in knowledge_base:
        existing = db.query(KnowledgeSource).filter(KnowledgeSource.title == kb["title"]).first()
        if not existing:
            db.add(KnowledgeSource(**kb))
    db.commit()

    # 5. Seed Official Advisory
    advisory = db.query(AdvisoryRecord).first()
    if not advisory:
        db.add(AdvisoryRecord(
            title="Pre-Monsoon Land Preparation & Soil Testing Advisory",
            category="Soil & Fertilizer",
            message="Farmers are advised to complete deep summer ploughing to expose hibernating insect pupae and weed seeds to solar heat. Send soil samples to your nearest KVK or Soil Health Lab before sowing.",
            source="Department of Agriculture & Farmers Welfare",
            advisory_type="Official Agro Advisory"
        ))
        db.commit()

    db.close()
    print("Database initialized & seeded with realistic agricultural data successfully!")

if __name__ == "__main__":
    init_db()

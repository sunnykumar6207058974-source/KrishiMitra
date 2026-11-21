"""
KrishiMitra Knowledge Source Manager & Assam Agricultural Knowledge Base
Grounded in AAU (Assam Agricultural University) Package of Practices & ICAR Publications
"""
from typing import List, Dict, Any

VERIFIED_KNOWLEDGE_DOCUMENTS = [
    {
        "id": "aau_soil_acidity_mgmt",
        "title": "Package of Practices for Managing Acid Soils in Assam",
        "organization": "Assam Agricultural University (AAU), Jorhat",
        "document_type": "Official Package of Practices",
        "source_url": "http://www.aau.ac.in/package-of-practices",
        "category": "Soil Management",
        "region": "Assam (Cachar, Kamrup, Jorhat, Nagaon, Golaghat, Dibrugarh)",
        "soil_types": ["Acidic Alluvial", "Red Sandy Clay", "Lateritic"],
        "content": (
            "Acidic Soils in Assam (pH 4.8 to 5.6): Almost 84% of cultivated soils in Assam suffer from high acidity, "
            "causing aluminum toxicity, poor bacterial nodulation in pulses, and severe Phosphorus fixation. "
            "Recommended Practice: Apply Agricultural Lime (calcium carbonate @ 250 to 350 kg/Bigha or 1.8-2.5 t/ha) "
            "thoroughly into topsoil 20 to 25 days before sowing or transplanting. Liming should be repeated only once "
            "every 3 years. Combine with Rock Phosphate (RP) or Single Super Phosphate (SSP) instead of DAP for steady "
            "phosphate uptake in acidic conditions. Incorporate Farm Yard Manure (FYM) @ 1.5 t/Bigha to buffer soil pH."
        ),
        "crops": ["Paddy", "Pulses", "Mustard", "Vegetables"]
    },
    {
        "id": "aau_sali_paddy_guidelines",
        "title": "Sali (Winter) Rice Production Technology in Flood & Non-Flood Zones",
        "organization": "Assam Agricultural University & ICAR-NRRI",
        "document_type": "ICAR-AAU Technical Bulletin",
        "source_url": "https://nrri.icar.gov.in/rice-technologies",
        "category": "Crop Production",
        "region": "Brahmaputra and Barak Valleys, Assam",
        "soil_types": ["Clayey Loam", "Alluvial Lowland"],
        "content": (
            "Sali Rice (Winter Paddy) Sowing & Transplanting Guidelines: Ideal nursery sowing is from June 15 to July 15. "
            "Transplanting should be completed by July 25 to August 15 using 25-30 day-old seedlings (2 to 3 seedlings per hill). "
            "Recommended Varieties: Ranjit, Bahadur, Kushal, Mahsuri for medium to deep water; Swarna Sub-1 and Ranjit Sub-1 "
            "for flood-prone flash flood areas (can survive 14-17 days complete water submergence); Disang and Kolong for drought prone highlands. "
            "Fertilizer Dose (per Bigha): 8 kg Nitrogen (18 kg Urea), 4 kg P2O5 (25 kg SSP), and 4 kg K2O (7 kg MOP). "
            "Apply 50% Urea + full SSP & MOP at final puddling; 25% Urea at active tillering (25-30 DAT); remaining 25% at panicle initiation."
        ),
        "crops": ["Sali Paddy", "Rice"]
    },
    {
        "id": "icar_flood_protection_crops",
        "title": "Post-Flood Contingency Agriculture & Heavy Rainfall Mitigation",
        "organization": "ICAR Research Complex for NEH Region & AAU",
        "document_type": "Disaster Contingency Advisory",
        "source_url": "https://icarneh.ernet.in/advisory/assam-flood.pdf",
        "category": "Disaster & Weather Risk",
        "region": "All Flood-Prone Districts of Assam",
        "soil_types": ["Floodplain Silt", "Alluvium"],
        "content": (
            "Heavy Rainfall & Flood Management in Field Crops: In low-lying and waterlogged areas, construct peripheral "
            "drainage channels with 0.5% slope to quickly flush excess floodwater within 48 hours. "
            "For submerged paddy: If seedlings are damaged by floodwaters, perform direct wet-seeding with sprouted seeds "
            "of short duration varieties like Luit, Dishang, or Lachit up to September 1st week, or practice double-transplanting "
            "(Kharan). In fields where water recedes late (October), immediately prepare field for zero-tillage yellow mustard "
            "(Toria TS-38 / M-27) or rabi pulses (black gram / green gram) utilizing residual silt moisture."
        ),
        "crops": ["Rice", "Toria", "Mustard", "Black Gram"]
    },
    {
        "id": "aau_rice_disease_ipm",
        "title": "Integrated Pest and Disease Management (IPM) in Rice",
        "organization": "Assam Agricultural University - Directorate of Research",
        "document_type": "Plant Protection Guidelines",
        "source_url": "http://www.aau.ac.in/plant-protection/rice-ipm",
        "category": "Pest & Disease Control",
        "region": "Assam State-wide",
        "soil_types": ["All Soil Types"],
        "content": (
            "Common Rice Diseases and Pests in Assam: "
            "1. Brown Spot (Bipolaris oryzae): Symptoms include dark brown, oval/elliptical spots on leaf blades with yellow halos, "
            "strongly correlated with potash and silica deficiency in acidic soils. Management: Apply balanced MOP fertilizer and seed treatment with Trichoderma viride @ 5g/kg seed. "
            "2. Blast (Pyricularia oryzae): Diamond/spindle-shaped lesions with grey center. Avoid excessive early urea application. "
            "3. Yellow Stem Borer (Scirpophaga incertulas): Produces deadhearts at vegetative stage and whiteheads at maturity. "
            "Management: Install pheromone traps @ 8-10 traps/ha. Maintain field sanitation. For severe outbreaks, consult nearest KVK officer before any synthetic spray."
        ),
        "crops": ["Rice", "Paddy"]
    },
    {
        "id": "kvk_toria_mustard_assam",
        "title": "Package of Practices for Rape & Mustard (Toria) Post-Paddy",
        "organization": "Krishi Vigyan Kendra (KVK) Cachar & AAU Extension",
        "document_type": "KVK Agronomy Handout",
        "source_url": "https://cachar.kvk.icar.gov.in/toria-guide",
        "category": "Rabi Oilseed Cultivation",
        "region": "Barak Valley, Cachar, Hailakandi, Karimganj",
        "soil_types": ["Sandy Loam", "Clay Loam"],
        "content": (
            "Yellow Mustard / Toria (Brassica campestris) post-Sali paddy: Sowing window: Mid-October to Mid-November. "
            "Promising Varieties for Assam: TS-36, TS-38, M-27, and PM-26. Seed Rate: 1.3 to 1.5 kg/Bigha (10 kg/ha). "
            "Spacing: 25-30 cm row-to-row, 10 cm plant-to-plant. "
            "Fertilizer: 40 kg N, 35 kg P2O5, 20 kg K2O, and critically 20 kg Sulphur per hectare. Sulphur application is essential "
            "in Assam soils to increase oil content and frost/aphid resistance. One irrigation at flowering (30 DAS) enhances yield by 35%."
        ),
        "crops": ["Mustard", "Toria", "Oilseeds"]
    },
    {
        "id": "aau_crop_calendar_monthly",
        "title": "Assam Agro-Climatic Monthly Farming Calendar & Seasonal Operations",
        "organization": "Assam Agricultural University Extension & IMD RMC Guwahati",
        "document_type": "Agromet Advisory Bulletin",
        "source_url": "http://www.aau.ac.in/extension/agro-calendar",
        "category": "Farming Calendar",
        "region": "Assam Valley Districts",
        "soil_types": ["Alluvial"],
        "content": (
            "Seasonal Crop Calendar for Assam: "
            "Kharif (June-October): Main season for Sali Paddy, Jute, Black Gram. Operations: Sowing mid-June, transplanting July, weed management at 20 & 40 DAT. "
            "Rabi (October-March): Cultivation of Toria (Mustard), Potato, Winter Vegetables (Cabbage, Cauliflower, Tomato), Boro Rice in low-lying beels. "
            "Zaid / Pre-Kharif (March-May): Ahu paddy, Jute sowing, Maize, Summer vegetables. "
            "Important Current Month Tasks: Post-monsoon field drainage, harvesting of early Sali paddy, preparation of seedbed for rabi mustard and winter pulses."
        ),
        "crops": ["Rice", "Mustard", "Pulses", "Vegetables", "Potato"]
    }
]

def get_all_knowledge_documents() -> List[Dict[str, Any]]:
    """Return all curated, verified agricultural knowledge sources."""
    return VERIFIED_KNOWLEDGE_DOCUMENTS

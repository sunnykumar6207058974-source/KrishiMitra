from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, Float, Boolean, Text, ForeignKey, DateTime
)
from sqlalchemy.orm import relationship
from app.database.session import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    mobile_number = Column(String(20), unique=True, index=True, nullable=False)
    email = Column(String(120), unique=True, index=True, nullable=True)
    hashed_password = Column(String(255), nullable=False)
    state = Column(String(100), nullable=False)
    district = Column(String(100), nullable=False)
    preferred_language = Column(String(20), default="en")  # en, hi, as
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    profile = relationship("FarmerProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    farms = relationship("Farm", back_populates="user", cascade="all, delete-orphan")
    soil_reports = relationship("SoilReport", back_populates="user", cascade="all, delete-orphan")
    recommendations = relationship("CropRecommendation", back_populates="user", cascade="all, delete-orphan")
    tasks = relationship("FarmingTask", back_populates="user", cascade="all, delete-orphan")
    chats = relationship("ChatHistory", back_populates="user", cascade="all, delete-orphan")


class FarmerProfile(Base):
    __tablename__ = "farmer_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    farm_name = Column(String(150), default="My Farm")
    total_land_area = Column(Float, default=2.0)
    land_unit = Column(String(20), default="Acres")  # Acres, Bigha, Hectares, Guntha
    primary_soil_type = Column(String(100), default="Alluvial")
    irrigation_source = Column(String(100), default="Canal & Tube Well")
    experience_years = Column(Integer, default=5)
    bio = Column(Text, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="profile")


class Farm(Base):
    __tablename__ = "farms"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    farm_name = Column(String(150), nullable=False)
    state = Column(String(100), nullable=False)
    district = Column(String(100), nullable=False)
    village = Column(String(150), nullable=True)
    land_size = Column(Float, nullable=False)
    land_unit = Column(String(20), default="Acres")
    soil_type = Column(String(100), default="Loamy")
    irrigation_available = Column(Boolean, default=True)
    primary_crops = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="farms")
    soil_reports = relationship("SoilReport", back_populates="farm", cascade="all, delete-orphan")
    tasks = relationship("FarmingTask", back_populates="farm", cascade="all, delete-orphan")


class SoilReport(Base):
    __tablename__ = "soil_reports"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    farm_id = Column(Integer, ForeignKey("farms.id", ondelete="SET NULL"), nullable=True)
    nitrogen = Column(Float, nullable=False)
    phosphorus = Column(Float, nullable=False)
    potassium = Column(Float, nullable=False)
    ph = Column(Float, nullable=False)
    organic_carbon = Column(Float, default=0.55)
    electrical_conductivity = Column(Float, default=0.8)
    source_type = Column(String(50), default="Manual Entry")  # Manual Entry, Soil Health Card Upload
    verified_by_farmer = Column(Boolean, default=True)
    test_date = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="soil_reports")
    farm = relationship("Farm", back_populates="soil_reports")


class Crop(Base):
    __tablename__ = "crops"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True, nullable=False)
    scientific_name = Column(String(150), nullable=True)
    category = Column(String(50), default="Cereal")  # Cereal, Pulse, Cash Crop, Oilseed, Vegetable
    optimal_temp_min = Column(Float, default=15.0)
    optimal_temp_max = Column(Float, default=32.0)
    optimal_rainfall_min = Column(Float, default=50.0)
    optimal_rainfall_max = Column(Float, default=250.0)
    optimal_ph_min = Column(Float, default=5.5)
    optimal_ph_max = Column(Float, default=7.5)
    season_type = Column(String(50), default="Kharif")  # Kharif, Rabi, Zaid
    description = Column(Text, nullable=True)


class CropSeason(Base):
    __tablename__ = "crop_seasons"

    id = Column(Integer, primary_key=True, index=True)
    crop_id = Column(Integer, ForeignKey("crops.id", ondelete="CASCADE"), nullable=False)
    season_name = Column(String(50), nullable=False)  # Kharif, Rabi, Zaid
    sowing_start_month = Column(String(20), nullable=False)
    sowing_end_month = Column(String(20), nullable=False)
    harvest_start_month = Column(String(20), nullable=False)
    harvest_end_month = Column(String(20), nullable=False)


class CropRecommendation(Base):
    __tablename__ = "crop_recommendations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=True)
    farm_id = Column(Integer, ForeignKey("farms.id", ondelete="SET NULL"), nullable=True)
    recommended_crop = Column(String(100), nullable=False)
    confidence_score = Column(Float, nullable=False)
    input_nitrogen = Column(Float, nullable=False)
    input_phosphorus = Column(Float, nullable=False)
    input_potassium = Column(Float, nullable=False)
    input_temp = Column(Float, nullable=False)
    input_humidity = Column(Float, nullable=False)
    input_ph = Column(Float, nullable=False)
    input_rainfall = Column(Float, nullable=False)
    state = Column(String(100), nullable=True)
    season = Column(String(50), nullable=True)
    explanation = Column(Text, nullable=True)
    alternatives = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="recommendations")


class WeatherRecord(Base):
    __tablename__ = "weather_records"

    id = Column(Integer, primary_key=True, index=True)
    state = Column(String(100), index=True, nullable=False)
    district = Column(String(100), index=True, nullable=False)
    temperature = Column(Float, nullable=False)
    humidity = Column(Float, nullable=False)
    rainfall = Column(Float, default=0.0)
    wind_speed = Column(Float, default=10.0)
    condition = Column(String(100), default="Sunny")
    forecast_json = Column(Text, nullable=True)
    recorded_at = Column(DateTime, default=datetime.utcnow)


class FarmingTask(Base):
    __tablename__ = "farming_tasks"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    farm_id = Column(Integer, ForeignKey("farms.id", ondelete="SET NULL"), nullable=True)
    crop_name = Column(String(100), nullable=False)
    task_title = Column(String(200), nullable=False)
    stage = Column(String(100), default="Sowing")  # Land Prep, Sowing, Irrigation, Weeding, Fertilizer, Harvesting
    due_date = Column(DateTime, nullable=False)
    is_completed = Column(Boolean, default=False)
    completed_at = Column(DateTime, nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="tasks")
    farm = relationship("Farm", back_populates="tasks")


class AdvisoryRecord(Base):
    __tablename__ = "advisory_records"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    title = Column(String(255), nullable=False)
    category = Column(String(50), default="General")  # Irrigation, Weather, Fertilizer, Pest, Harvesting
    message = Column(Text, nullable=False)
    source = Column(String(150), default="Verified Agro Advisory")
    advisory_type = Column(String(50), default="App-Generated Advisory")  # Official IMD or App-Generated
    created_at = Column(DateTime, default=datetime.utcnow)


class MandiPrice(Base):
    __tablename__ = "mandi_prices"

    id = Column(Integer, primary_key=True, index=True)
    state = Column(String(100), index=True, nullable=False)
    district = Column(String(100), index=True, nullable=False)
    market = Column(String(150), nullable=False)
    commodity = Column(String(100), index=True, nullable=False)
    variety = Column(String(100), default="Standard")
    min_price = Column(Float, nullable=False)
    max_price = Column(Float, nullable=False)
    modal_price = Column(Float, nullable=False)
    price_date = Column(String(50), nullable=False)
    source = Column(String(100), default="Agmarknet Demo API")


class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    role = Column(String(20), nullable=False)  # user, assistant
    message = Column(Text, nullable=False)
    sources_json = Column(Text, nullable=True)
    language = Column(String(20), default="en")
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="chats")


class KnowledgeSource(Base):
    __tablename__ = "knowledge_sources"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    organization = Column(String(150), default="Assam Agricultural University")
    document_type = Column(String(100), default="ICAR Publication")
    content = Column(Text, nullable=False)
    category = Column(String(100), default="Crop Management")
    reference_url = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    chunks = relationship("DocumentChunk", back_populates="source", cascade="all, delete-orphan")


class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    title = Column(String(255), default="Farming Advisory")
    language = Column(String(20), default="en")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    messages = relationship("ChatMessage", back_populates="conversation", cascade="all, delete-orphan", order_by="ChatMessage.created_at")


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(String(64), ForeignKey("conversations.id", ondelete="CASCADE"), nullable=False, index=True)
    role = Column(String(20), nullable=False)  # user, assistant
    content = Column(Text, nullable=False)
    sources_json = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    conversation = relationship("Conversation", back_populates="messages")


class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id = Column(Integer, primary_key=True, index=True)
    source_id = Column(Integer, ForeignKey("knowledge_sources.id", ondelete="CASCADE"), nullable=False, index=True)
    content = Column(Text, nullable=False)
    metadata_json = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    source = relationship("KnowledgeSource", back_populates="chunks")

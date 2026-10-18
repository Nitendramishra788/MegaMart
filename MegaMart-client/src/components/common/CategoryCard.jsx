function CategoryCard({ name, image ,   cardBgColor}) {
    return (
        <div className="category-card" style={{ backgroundColor: cardBgColor }}>
            <div className="category-image">
                <img src={image} alt={name} />
                 <h3 className="category-name">{name}</h3>
            </div>
            
        </div>
        
    );  
}

export default CategoryCard;
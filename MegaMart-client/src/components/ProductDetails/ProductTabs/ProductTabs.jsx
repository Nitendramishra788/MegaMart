import { useState } from "react";
import "./ProductTabs.css";

function ProductTabs({
    description,
    specifications = [],
    faqs = []
}) {
    const [activeTab, setActiveTab] = useState("description");

    return (
        <div className="productTabs">

            {/* Tab Navigation */}
            <div className="productTabNavigation">

                <button
                    type="button"
                    className={activeTab === "description" ? "activeTab" : ""}
                    onClick={() => setActiveTab("description")}
                >
                    Description
                </button>

                <button
                    type="button"
                    className={activeTab === "specifications" ? "activeTab" : ""}
                    onClick={() => setActiveTab("specifications")}
                >
                    Specifications
                </button>

                <button
                    type="button"
                    className={activeTab === "faqs" ? "activeTab" : ""}
                    onClick={() => setActiveTab("faqs")}
                >
                    FAQs
                </button>

            </div>

            {/* Tab Content */}
            <div className="productTabContent">

                {activeTab === "description" && (
                    <div className="descriptionTab">
                        <h3>Product Description</h3>
                        <p>{description || "Product description will appear here."}</p>
                    </div>
                )}

                {activeTab === "specifications" && (
                    <div className="specificationsTab">
                        <h3>Technical Specifications</h3>

                        {specifications.length > 0 ? (
                            <div className="specificationsList">
                                {specifications.map((item, index) => (
                                    <div className="specificationItem" key={index}>
                                        <span>{item.label}</span>
                                        <strong>{item.value}</strong>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No specifications available.</p>
                        )}
                    </div>
                )}

                {activeTab === "faqs" && (
                    <div className="faqsTab">
                        <h3>Frequently Asked Questions</h3>

                        {faqs.length > 0 ? (
                            faqs.map((faq, index) => (
                                <div className="faqItem" key={index}>
                                    <h4>{faq.question}</h4>
                                    <p>{faq.answer}</p>
                                </div>
                            ))
                        ) : (
                            <p>No FAQs available.</p>
                        )}
                    </div>
                )}

            </div>

        </div>
    );
}

export default ProductTabs;
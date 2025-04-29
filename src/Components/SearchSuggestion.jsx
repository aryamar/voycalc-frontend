import React, { useState, useEffect } from "react";
import { Form, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SearchSuggestion() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionText, setSuggestionText] = useState(""); // متن پیشنهادی کم‌رنگ


    // دریافت داده از سرور
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.trim() === "") {
                setSuggestions([]);
                setSuggestionText("");
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/ports?q=${query}`);
                const results = await response.json();
                setSuggestions(results);

                // تنظیم اولین پیشنهاد برای نمایش کم‌رنگ
                if (results.length > 0 && results[0].toLowerCase().startsWith(query.toLowerCase())) {
                    setSuggestionText(results[0]);
                } else {
                    setSuggestionText("");
                }
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        };

        fetchSuggestions();
    }, [query]);

    // هندل تغییر مقدار فیلد ورودی
    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    // هندل تایید با Enter
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && suggestions.length > 0) {
            setQuery(suggestions[0]); // تنظیم اولین پیشنهاد به عنوان مقدار ورودی
            setSuggestions([]);
            setSuggestionText("");
        }
    };

    return (
        <div style={{ position: "relative", width: "300px" }}>
            {/* متن کم‌رنگ (پیشنهادی) */}
            <div
                style={{
                    position: "absolute",
                    top: "-10px",
                    left: "0",
                    width: "100%",
                    padding: "10px",
                    boxSizing: "border-box",
                    fontSize: "16px",
                    //color: 'dark',
                    pointerEvents: "none",
                    zIndex: "0",
                    
                }}
            >
                {suggestionText}
            </div>

            {/* فیلد ورودی */}
            <input
                type="text"
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                style={{
                    width: "100%",
                    padding: "10px",
                    boxSizing: "border-box",
                    fontSize: "16px",
                    color:'black',
                    background:'white',
                    
                }}
                placeholder="Start typing..."
            />
        </div>
    );
};






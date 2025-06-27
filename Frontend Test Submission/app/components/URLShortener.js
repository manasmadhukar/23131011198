"use client";

import React, { useState, useEffect } from "react";
import "./URLShortener.css";

const URLShortener = () => {
  const [requestedUrl, setRequestedUrl] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [shortenedUrls, setShortenedUrls] = useState([]);

  useEffect(() => {
    loadShortenedUrls();
  }, []);

  const loadShortenedUrls = () => {
    const storedUrls = localStorage.getItem("shortenedUrls");
    if (storedUrls) {
      setShortenedUrls(JSON.parse(storedUrls));
    }
  };

  const shortenUrl = async () => {
    try {
      if (requestedUrl === "") {
        setIsEmpty(true);
        return;
      } else {
        setIsEmpty(false);
      }

      const response = await fetch(
        `https://url-shortening-vue-backend.vercel.app/api/shorten`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: requestedUrl.trim() }),
        }
      );

      const data = await response.json();

      if (data.error) {
        console.error(data.error);
      } else {
        const shortenedUrl = {
          requestedUrl: requestedUrl,
          resultUrl: data.result_url,
          isCopied: false,
        };

        const updatedUrls = [...shortenedUrls, shortenedUrl];
        setShortenedUrls(updatedUrls);

        localStorage.setItem("shortenedUrls", JSON.stringify(updatedUrls));
        setRequestedUrl("");
      }
    } catch (error) {
      console.error("An error occurred. Please try again.");
    }
  };

  const copyToClipboard = (item, index) => {
    navigator.clipboard.writeText(item.resultUrl);

    const updatedUrls = [...shortenedUrls];
    updatedUrls[index].isCopied = true;
    setShortenedUrls(updatedUrls);

    setTimeout(() => {
      const resetUrls = [...shortenedUrls];
      resetUrls[index].isCopied = false;
      setShortenedUrls(resetUrls);
    }, 3000);
  };

  const clearInput = (index) => {
    const updatedUrls = shortenedUrls.filter((_, i) => i !== index);
    setShortenedUrls(updatedUrls);
  };

  return (
    <div className="url-shortener-container">
      <div className="shortening-section">
        <div className="input-container">
          <div className="input-section">
            <div className="input-wrapper">
              <input
                type="text"
                value={requestedUrl}
                onChange={(e) => setRequestedUrl(e.target.value)}
                placeholder="Shorten a link here..."
                className={`url-input ${isEmpty ? "error" : ""}`}
              />
              {isEmpty && (
                <span className="error-message">Please add a link</span>
              )}
            </div>
            <button className="shorten-btn" onClick={shortenUrl}>
              Shorten It!
            </button>
          </div>
        </div>

        {shortenedUrls.map((item, index) => (
          <div key={index} className="shortened-url-container">
            <div className="shortened-url-item">
              <div className="original-url">
                <a
                  href={item.requestedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.requestedUrl}
                </a>
              </div>
              <div className="shortened-url-actions">
                <div className="shortened-url">
                  <a
                    href={item.resultUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.resultUrl}
                  </a>
                </div>
                {!item.isCopied ? (
                  <button
                    className="copy-btn"
                    onClick={() => copyToClipboard(item, index)}
                  >
                    Copy
                  </button>
                ) : (
                  <button className="copied-btn">Copied</button>
                )}
                <button
                  className="delete-btn"
                  onClick={() => clearInput(index)}
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default URLShortener;

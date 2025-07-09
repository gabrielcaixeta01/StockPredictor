# Smart Ticker  
#### Video Demo: <URL HERE>  
#### Description:  
Smart Ticker is an intelligent stock prediction platform designed to assist investors with AI-powered insights. The system forecasts short-term stock price movements and provides a probabilistic evaluation of whether a stock is likely to rise or fall.

The project combines data science, machine learning, and modern web development to deliver a fast, responsive user experience with meaningful predictions.

Key features include:
- Stock Price Prediction: Forecasts the next-day price of a selected stock using a trained Random Forest model.
- Probability of Increase/Decrease: Computes and displays the likelihood that the stock will go up or down in the next period.
- Data Sources: Pulls real-time and historical data from Yahoo Finance, and optionally uses NewsAPI for sentiment analysis.
- Front-end: Built with Next.js and styled using Tailwind CSS, offering a clean and modern UI with responsive design.
- Back-end and ML Pipeline: Written in Python, with `generate.py` coordinating data fetching, preprocessing, and prediction using scikit-learn.
- Component-based Architecture: Ensures modularity and scalability using reusable React components (e.g., StockTickerWidget, TopStocks).


Smart Ticker is ideal for developers, students, and investors interested in financial machine learning, with clear potential for future development into a more robust trading assistant.
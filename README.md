# serverless-api-dynamodb

- API NodeJS w/ typescript
- Allows you to run the API locally or in serverless mode
- Recommended for small, low-use APIs only:
  - Up the entire API in a single lambda function
  - Useful for personal projects
  - Zero or very low monthly cost

## install dependencies
`npm install`  

## configure .env 
`cp .env.sample .env`  
`nano .env`

## run local
`npm run dev`

## deploy aws lambda
prod stage:  
`npm run deploy:prod`  
dev stage:  
`npm run deploy:dev` 

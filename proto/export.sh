# !bin/sh

npx buf generate
npx buf export . --output ../nestjs-grpc-tutorial/src/proto
npx buf export . --output ../user-api/src/proto
npx buf export . --output ../hotel-api/src/proto
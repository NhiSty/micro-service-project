# !bin/sh

npx buf generate
npx buf export . --output ../task-api/src/proto
npx buf export . --output ../user-api/src/proto
npx buf export . --output ../auth-api/src/proto
npx buf export . --output ../learn-api/src/proto
npx buf export . --output ../nestjs-grpc-tutorial/src/proto
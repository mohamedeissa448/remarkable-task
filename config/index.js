const dev = process.env.NODE_ENV !== 'production'

export const server = dev ? 'http://localhost:3000' : 'https://whatever.com';
export const DB = dev ? 'mongodb://localhost:27017/articles-task' : 'mongodb://localhost:27017/articles-task';
export const JWT_SECRET = "66bbc7c61f7ddca1e75e92a3746281f840c255486d59c9e9bd3801394258b74963e8990f4c59b54c39b3cf1ed84bb42e8f95fa2962e8d42dd02ba9728de19255";
export const JWT_EXPIRES_IN = "1h"
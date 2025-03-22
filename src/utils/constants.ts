

export const JWT_SECRET = ()=>{
    if(!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");
    return process.env.JWT_SECRET! ;
}
export const MONGO_URI = ()=>{
    if(!process.env.MONGO_URI) throw new Error("MONGO_URI is not defined");
    return process.env.MONGO_URI!;
}
export const PORT = process.env.PORT! || 5000;
export const NODE_ENV = ()=>{
    if(!process.env.NODE_ENV) throw new Error("NODE_ENV is not defined");
    return process.env.NODE_ENV!;    
}

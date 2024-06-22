import multer from 'multer';
import pkg from 'multer-gridfs-storage';
const { GridFsStorage } = pkg;
import dotenv from "dotenv";
dotenv.config();

const username= process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;

// Create storage engine
const storage = new GridFsStorage({
    url: `mongodb://${username}:${password}@ac-87pheul-shard-00-00.jt7nge4.mongodb.net:27017,ac-87pheul-shard-00-01.jt7nge4.mongodb.net:27017,ac-87pheul-shard-00-02.jt7nge4.mongodb.net:27017/?ssl=true&replicaSet=atlas-r47hfv-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster`,
    file: (request, file) => {
        const match = ["image/png", "image/jpg", "image/jpeg"];

        if (match.indexOf(file.mimeType) === -1) {  
            return `${Date.now()}-blog-${file.originalname}`;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        };
    }
});

export default multer({ storage });
// import multer from 'multer';
// import { GridFsStorage } from 'multer-gridfs-storage';
// // import dotenv from 'dotenv';

// // dotenv.config();


// // const username= process.env.DB_USERNAME;
// // const password=process.env.DB_PASSWORD;

// const storage = new GridFsStorage({
//     url: "mongodb://sakshi:blog@ac-87pheul-shard-00-00.jt7nge4.mongodb.net:27017,ac-87pheul-shard-00-01.jt7nge4.mongodb.net:27017,ac-87pheul-shard-00-02.jt7nge4.mongodb.net:27017/?ssl=true&replicaSet=atlas-r47hfv-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster",
    
//     file: (request, file) => {
//         const match = ["image/png", "image/jpg", "image/jpeg"];

//         if(match.indexOf(file.mimeType) === -1) 
//             return`${Date.now()}-blog-${file.originalname}`;

//         return {
//             bucketName: "photos",
//             filename: `${Date.now()}-blog-${file.originalname}`
//         }
//     }
// });

// export default multer({storage}); 
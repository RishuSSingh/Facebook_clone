const path = require('path');
const fs = require('fs');
const filepath = path.join(__dirname,'..','data','data.json');

class  posts {
    static addpost(post){
        return  new Promise((resolve,reject)=>{
            fs.readFile(
                filepath,
                {
                    encoding:'utf-8'
                },
                (err,data)=>{
                    if(err) return reject(err);
                    data = JSON.parse(data);
                    data.push(post);
                    fs.writeFile(
                        filepath,
                        JSON.stringify(data),
                        (err)=>{
                            if(err) return reject(err);
                            resolve(data);
                        }
                    )
                }
            )
        })
    }

    static getallpost(){
        return new Promise((resolve,reject)=>{
            fs.readFile(
                filepath,{
                    encoding:'utf-8'
                },
                (err,data)=>{
                    if(err) return reject(err);
                    resolve(data);
                }
            ) 
        })
    }

    static deletepost(id){
        return new Promise((resolve,reject)=>{
            fs.readFile(filepath,{encoding:'utf-8'},(err,data)=>{
                if(err) return reject(err);
                data = JSON.parse(data);
                data = data.filter((d)=>d.id != id);
                fs.writeFile(
                    filepath,
                    JSON.stringify(data),
                    (err)=>{
                        if(err) return reject(err);
                        resolve(data);
                    }
                    )
            })
        });
    }
}
module.exports = posts;
const env = process.env.NODE_ENV || "dev";

const config = ()=> {
    switch(env){
        case "dev":
            return{
                urlConnect : 'mongodb+srv://omni:omni@clusterapi-mrbe0.mongodb.net/test?retryWrites=true&w=majority',
                port : 3333,
                newParser : true
            };
    }
}
console.log(`AMBIENTE : ${env}`)
module.exports = config();
module.exports = {
    apps: [
        {
            name: "Grocery-Store",
            script: "./index.js",
            instances: "max",
            exec_mode: "cluster",
            env: {
                NODE_ENV: "development",
            },
            env_production: {
                NODE_ENV: "production",
            },
        }
    ]    
};
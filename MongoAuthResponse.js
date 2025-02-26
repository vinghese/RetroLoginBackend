class MongoAuthResponse {
    constructor(success, message) {
        this.success = success;
        this.message = message;
    }

    static from(data) {
        console.log("Mongo Auth Response", data)
        if (typeof data !== 'object' || data === null) {
            throw new Error('Invalid data to create MongoAuthResponse');
        }
        return new MongoAuthResponse(data.success, data.message);
    }

    // toString() {
    //     return `MongoAuthResponse(success: ${this.success}, message: ${this.message})`;
    // }
}

module.exports = MongoAuthResponse;

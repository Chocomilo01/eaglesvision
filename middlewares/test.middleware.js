function testmiddleware (res, res, next){
    console.log("on the test middleware")

    
    next()
    }
    
    module.exports = testmiddleware
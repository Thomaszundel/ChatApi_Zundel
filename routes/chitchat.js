//dependencies
var express = require('express');
var router = express.Router();
const date = require('date-and-time');
var fs = require('fs');
const now = new Date();

//CRUD endpoints
router.get('/',function(req,res){
    try{
        var rawdata = fs.readFileSync('chitchat_data.json'); //buffer <hex code>
        var chat = JSON.parse(rawdata);
    
        console.log(chat);
    
        res.status(200).json(chat);

    } catch(err){
        res.status(500).json({message: err.message});
    }
    
});
router.get('/:id',function(req,res){
    try{
        var rawdata = fs.readFileSync('chitchat_data.json'); //buffer <hex code>
        var chat = JSON.parse(rawdata);
    
        console.log(chat[req.params.id]);

        

    
        res.status(200).json(chat[req.params.id]);

    } catch(err){
        res.status(500).json({message: err.message});
    }
    
});


//create a new resorce
router.post('/',function(req,res){
    try{
        console.log("Posted Object is: ", req.body);
        //open the file
        const rawdata = fs.readFileSync('chitchat_data.json');

        //decode the file
        var chat = JSON.parse(rawdata);

        //control data added
        var rawBody = req.body;

        var newObj = {
            message: null,
            author: null,
            date_created: date.format(now, 'YYYY/MM/DD HH:mm:ss')
        };

        
        if(rawBody.message != null){
            newObj.message = rawBody.message;
        }
        if(rawBody.author != null){
            newObj.author = rawBody.author;
        }
        
       
        
        //get real index
        newObj._id = chat.length;

        // add new object
        chat.push(newObj);
        //save (write data back to file)
        const data = fs.writeFileSync('chitchat_data.json', JSON.stringify(chat))
        //return data
        res.status(201).json({chatlog:newObj});
        

    } catch(err){
        res.status(500).json({message:err.message});

    }
    //res.status(201).json({message: "success create resorce"});
});


//update
router.patch('/:id', function(req,res){
        try{
            console.log("Object being pached is: ", req.params.id, req.body);
            //open the file
            const rawdata = fs.readFileSync('chitchat_data.json');
    
            //decode the file
            var chat = JSON.parse(rawdata);
    
            //control data added
            var id = req.params.id;
            var rawBody = req.body;
            if(rawBody.message != null){
                chat[id].message = rawBody.message;
            }
            if(rawBody.author != null){
                chat[id].author = rawBody.author;
            }
            
            chat[id].date_created = date.format(now, 'YYYY/MM/DD HH:mm:ss');
            
            
            
            //save (write data back to file)
            const data = fs.writeFileSync('chitchat_data.json', JSON.stringify(chat))
            //return data
            res.status(200).json(chat[id]);
            
    
        } catch(err){
            res.status(500).json({message:err.message});
    
        }
    
});

//delete
router.delete('/:id', function(req,res){
    //capture the id
    var id = req.params.id;

    //open the file for reading
    const rawdata = fs.readFileSync('chitchat_data.json');
    var chat = JSON.parse(rawdata);
    
    
    //if found delete
    if (chat.length > id){

        chat.splice(id,1);
        //write to file
        const data = fs.writeFileSync('chitchat_data.json', JSON.stringify(chat))

        res.status(200).json({message: "ok"});
    }else{
        res.status(500).json({message: "Somthing went wrong"})
    }

    //if no item found throw error

   
});


module.exports = router;
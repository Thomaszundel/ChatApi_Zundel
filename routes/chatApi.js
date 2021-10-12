//dependencies
var express = require('express');
var router = express.Router();
var fs = require('fs');

//CRUD endpoints
router.get('/',function(req,res){
    try{
        var rawdata = fs.readFileSync('data.json'); //buffer <hex code>
        var students = JSON.parse(rawdata);
    
        console.log(students);
    
        res.status(200).json(students);

    } catch(err){
        res.status(500).json({message: err.message});
    }
    
});
router.get('/:id',function(req,res){
    try{
        var rawdata = fs.readFileSync('data.json'); //buffer <hex code>
        var students = JSON.parse(rawdata);
    
        console.log(students[req.params.id]);

        

    
        res.status(200).json(students[req.params.id]);

    } catch(err){
        res.status(500).json({message: err.message});
    }
    
});


//create a new resorce
router.post('/',function(req,res){
    try{
        console.log("Posted Object is: ", req.body);
        //open the file
        const rawdata = fs.readFileSync('data.json');

        //decode the file
        var students = JSON.parse(rawdata);

        //control data added
        var rawBody = req.body;

        var newObj = {
            name: null,
            age: null,
            currentGame: null
        };

        
        if(rawBody.name != null){
            newObj.name = rawBody.name;
        }
        if(rawBody.age != null){
            newObj.age = rawBody.age;
        }
        if(rawBody.currentGame != null){
            newObj.currentGame = rawBody.currentGame;
        }
        
        //get real index
        newObj._id = students.length;

        // add new object
        students.push(newObj);
        //save (write data back to file)
        const data = fs.writeFileSync('data.json', JSON.stringify(students))
        //return data
        res.status(201).json(newObj);
        

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
            const rawdata = fs.readFileSync('data.json');
    
            //decode the file
            var students = JSON.parse(rawdata);
    
            //control data added
            var id = req.params.id;
            var rawBody = req.body;
            if(rawBody.name != null){
                students[id].name = rawBody.name;
            }
            if(rawBody.age != null){
                students[id].age = rawBody.age;
            }
            if(rawBody.currentGame != null){
                students[id].currentGame = rawBody.currentGame;
            }
            
            //save (write data back to file)
            const data = fs.writeFileSync('data.json', JSON.stringify(students))
            //return data
            res.status(200).json(students[id]);
            
    
        } catch(err){
            res.status(500).json({message:err.message});
    
        }
    
});

//delete
router.delete('/:id', function(req,res){
    //capture the id
    var id = req.params.id;

    //open the file for reading
    const rawdata = fs.readFileSync('data.json');
    var students = JSON.parse(rawdata);
    
    
    //if found delete
    if (students.length > id){

        students.splice(id,1);
        //write to file
        const data = fs.writeFileSync('data.json', JSON.stringify(students))

        res.status(200).json({message: "ok"});
    }else{
        res.status(500).json({message: "Somthing went wrong"})
    }

    //if no item found throw error

   
});


module.exports = router;
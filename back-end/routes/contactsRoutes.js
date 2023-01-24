const contactsSchema = require('../models/contactsSchema')
/*
*Mark:
*Good route naming (,I can see the intent of each route) but it's better to use dashes(-) than underscores(_)
*The reason why we use lowercases and dashes is because typing routes should be easier (You don't press the shift key all the time when you type your route)
*/
const saveContacts = (app) => {
    
    app.post('/save_contact' , async (req, res) => {
        let {contact_number , contact_name , contact_email} = req.body
        /*Mark: if you data variables and structure are the same as the one you are accepting in the database there is no need to restructure*/
    try{
        let post = new contactsSchema ({
            contact_number , contact_name , contact_email
        })
        const contactSaved = await post.save()
         
        res.send({massage:"Succesfully saved", contactSaved})
    }catch (error) {
        console.error("post error", error)
        res.send({massage:"post error"}).status(404)
    }

    })

    app.get('/get_contacts' , async (req, res) => {
        try {
            const findContacts = await contactsSchema.find()
            res.send(findContacts)
        }catch(error) {
            console.log('error', error)
        }
    })

    app.delete('/delete_contact/:id' , async (req , res)  =>  {
        try{
            const {id} = req.params  
            const deleteContact = await contactsSchema.deleteOne({_id : id})
            res.send({message: "Deleted", deleteContact})
        }catch(err){
            console.log(err);
            res.sendStatus(501)
        }
    })
app.put('/update_contact/:id', async (req, res) =>{
        
        const {contact_number , contact_name, contact_email } = req.body
         const {id } = req.params
         const contactInfo = req.body
        try{

            await contactsSchema.findByIdAndUpdate({_id : id }, {contact_number : contact_number , contact_name : contact_name , contact_email : contact_email});
            res.status(200).send({massage: `Updated`, data: contactInfo})
        }catch (error){
         console.log(error)
            res.sendStatus(200)
        }


})


}



module.exports = {saveContacts}

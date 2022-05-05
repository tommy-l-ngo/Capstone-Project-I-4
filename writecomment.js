function writeData(user_name,project,content,time) 
{
   const db = getDatabase(); 
   set(ref(db,"comments/" + user_name),{
     user:user_name,
     project:project,
     content:content,
     time:time
   })
}

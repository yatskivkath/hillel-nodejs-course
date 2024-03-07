const createUser = (req, res) => {
    const { name, password } = req.body;
    const created_time = Date.now();
    // add user to db
    
    res.status(201).end();
}

export {
    createUser,
}
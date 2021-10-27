const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Alert = require('../models/Alert');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Alerts using: GET "/api/alerts/fetchallalerts". Login required
router.get('/fetchallalerts', fetchuser, async (req, res) => {
    try {
        const alerts = await Alert.find({ user: req.user.id, status:"active"});
        res.json(alerts)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})


// ROUTE 2: Add a new Alert using: POST "/api/alerts/addalert". Login required
router.post('/addalert', fetchuser, [
        body('crypto', 'crypto cannot be left empty').exists(),
        body('maxAmt', 'Max Aount can not be left empty').exists()
    ],
    async (req, res) => {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { crypto, minAmt, maxAmt, status } = req.body;

            
            const alert = new Alert({
                crypto, minAmt, maxAmt, status, user: req.user.id
            })
            const savedAlert = await alert.save()

            res.json(savedAlert)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })


// ROUTE 3: Update an existing Alert using: PUT "/api/alerts/updatealert". Login required
router.put('/updatealert/:id', fetchuser, async (req, res) => {
    const { crypto, minAmt, maxAmt, status  } = req.body;
    try {
        // Create a newAlert object
        const newAlert = {};
        if (crypto) { newAlert.crypto = crypto };
        if (minAmt) { newAlert.minAmt = minAmt };
        if (maxAmt) { newAlert.maxAmt = maxAmt };

        // Find the alert to be updated and update it
        let alert = await Alert.findById(req.params.id);
        if (!alert) { return res.status(404).send("Not Found") }

        if (alert.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        alert = await Alert.findByIdAndUpdate(req.params.id, { $set: newAlert }, { new: true })
        res.json({ alert });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 4: Delete an existing Alert using: DELETE "/api/alerts/deletealert". Login required
router.delete('/deletealert/:id', fetchuser, async (req, res) => {
    try {
        // Find the alert to be delete and delete it
        let alert = await Alert.findById(req.params.id);
        if (!alert) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Alert
        if (alert.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        alert = await Alert.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", alert: alert });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;
const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // Autoriser les requêtes de n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    const { prompt } = req.body;
    
    if (!prompt) {
        return res.status(400).json({ error: "Prompt requis" });
    }
    
    try {
        // Pollinations.ai - API gratuite
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true&seed=${Date.now()}`;
        
        // Récupérer l'image
        const response = await fetch(url);
        const buffer = await response.buffer();
        const base64 = buffer.toString('base64');
        const imageUrl = `data:image/png;base64,${base64}`;
        
        res.json({ imageUrl: imageUrl });
        
    } catch (error) {
        console.error("Erreur:", error);
        res.status(500).json({ error: error.message });
    }
};

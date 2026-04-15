const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // Autoriser les requêtes
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    const { prompt } = req.body;
    
    if(!prompt) {
        return res.status(400).json({ error: "Prompt requis" });
    }
    
    // Pollinations.ai - GRATUIT, pas de clé API
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true&seed=${Date.now()}`;
    
    // Télécharger l'image générée
    const response = await fetch(url);
    const buffer = await response.buffer();
    
    // Convertir en base64 pour l'envoyer au frontend
    const base64 = buffer.toString('base64');
    const imageUrl = `data:image/png;base64,${base64}`;
    
    res.json({ imageUrl: imageUrl });
};

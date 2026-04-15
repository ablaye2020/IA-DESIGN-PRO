let historique = [];

function genererIA() {
    let prompt = document.getElementById('prompt').value;
    const style = document.getElementById('style').value;
    
    if(!prompt) {
        alert("❌ Décrivez votre design !");
        return;
    }
    
    const styleMap = {
        cinematic: "style cinématique, éclairage dramatique, qualité cinéma",
        "3d": "style 3D réaliste, rendu professionnel, octane render",
        anime: "style anime japonais, couleurs vives, illustration manga",
        dark: "style sombre, gothique, ambiance mystérieuse, ténèbres",
        neon: "style néon cyberpunk, lumières colorées, futuriste"
    };
    
    let promptComplet = prompt;
    if(style && styleMap[style]) {
        promptComplet = `${prompt}, ${styleMap[style]}`;
    }
    
    document.getElementById('resultat').innerHTML = `
        <div style="text-align: center;">
            <div class="loading"></div>
            <p style="margin-top: 15px;">Génération IA en cours... (10-20 secondes)</p>
        </div>
    `;
    
    fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptComplet })
    })
    .then(res => res.json())
    .then(data => {
        if(data.imageUrl) {
            afficherResultat(data.imageUrl, prompt);
            sauvegarderHistorique(data.imageUrl, prompt);
        } else {
            throw new Error("Pas d'image reçue");
        }
    })
    .catch(erreur => {
        console.error(erreur);
        document.getElementById('resultat').innerHTML = `
            <div style="text-align: center; color: #ff6666;">
                <div style="font-size: 48px;">⚠️</div>
                <p>Erreur de génération. Réessaie dans quelques secondes.</p>
            </div>
        `;
    });
}

function afficherResultat(imageUrl, prompt) {
    document.getElementById('resultat').innerHTML = `
        <div style="text-align: center;">
            <img src="${imageUrl}" style="max-width: 100%; border-radius: 15px; margin-bottom: 15px;">
            <div>
                <button class="delete-btn" onclick="telechargerImage('${imageUrl}')">📥 Télécharger</button>
            </div>
            <p style="font-size: 10px; margin-top: 10px; color: #666;">Généré par IA - ${prompt.substring(0, 50)}...</p>
        </div>
    `;
}

function telechargerImage(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'design-ia.png';
    link.click();
}

function sauvegarderHistorique(imageUrl, prompt) {
    const id = Date.now();
    historique.unshift({ id, imageUrl, prompt, date: new Date().toLocaleString() });
    if(historique.length > 20) historique.pop();
    localStorage.setItem('ia_historique', JSON.stringify(historique));
    afficherHistorique();
}

function afficherHistorique() {
    const grid = document.getElementById('gallery-grid');
    if(historique.length === 0) {
        grid.innerHTML = '<p style="color: #666;">Aucun design généré</p>';
        return;
    }
    grid.innerHTML = historique.map(item => `
        <div class="gallery-card" onclick="afficherImage('${item.imageUrl}')">
            <img src="${item.imageUrl}" style="width: 100%;">
            <div style="font-size: 10px; margin-top: 5px;">${item.date}</div>
            <button class="delete-btn" onclick="event.stopPropagation(); supprimerHistorique(${item.id})">🗑</button>
        </div>
    `).join('');
}

function afficherImage(url) {
    document.getElementById('resultat').innerHTML = `
        <div style="text-align: center;">
            <img src="${url}" style="max-width: 100%; border-radius: 15px;">
            <button class="delete-btn" onclick="telechargerImage('${url}')" style="margin-top: 10px;">📥 Télécharger</button>
        </div>
    `;
}

function supprimerHistorique(id) {
    historique = historique.filter(item => item.id !== id);
    localStorage.setItem('ia_historique', JSON.stringify(historique));
    afficherHistorique();
}

// Charger l'historique au démarrage
const saved = localStorage.getItem('ia_historique');
if(saved) {
    historique = JSON.parse(saved);
    afficherHistorique();
}

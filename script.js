function genererTemplate() {
    const type = document.getElementById('type').value;
    const nom = document.getElementById('nom').value;
    const couleur = document.getElementById('couleur').value;
    
    if(!nom) {
        alert("❌ Entre un nom / texte pour ton design !");
        return;
    }
    
    let design = "";
    let largeur = 500;
    let hauteur = 500;
    
    if(type === "logo") {
        largeur = 400; hauteur = 400;
        design = `
            <div style="background: ${couleur}; width: ${largeur}px; height: ${hauteur}px; display: flex; flex-direction: column; justify-content: center; align-items: center; border-radius: 20px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                <div style="font-size: 60px;">⭐</div>
                <div style="font-size: 24px; font-weight: bold; margin-top: 20px; color: white; text-align: center;">${nom}</div>
                <div style="font-size: 14px; margin-top: 10px; color: rgba(255,255,255,0.8);">⭐️⭐️⭐️⭐️⭐️</div>
            </div>
        `;
    }
    
    if(type === "flyer") {
        largeur = 500; hauteur = 700;
        design = `
            <div style="background: ${couleur}; width: ${largeur}px; height: ${hauteur}px; display: flex; flex-direction: column; justify-content: center; align-items: center; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                <div style="font-size: 48px; margin-bottom: 20px;">🎉</div>
                <div style="font-size: 32px; font-weight: bold; color: white; text-align: center;">${nom}</div>
                <div style="font-size: 48px; font-weight: bold; margin: 20px 0; color: #FFD700;">-50%</div>
                <div style="font-size: 18px; color: rgba(255,255,255,0.9);">Offre valable jusqu'au 30/04</div>
            </div>
        `;
    }
    
    if(type === "carte") {
        largeur = 350; hauteur = 200;
        design = `
            <div style="background: ${couleur}; width: ${largeur}px; height: ${hauteur}px; display: flex; flex-direction: column; justify-content: center; align-items: center; border-radius: 10px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                <div style="font-size: 20px; font-weight: bold; color: white;">${nom}</div>
                <div style="font-size: 14px; margin-top: 10px; color: rgba(255,255,255,0.8);">📞 +221 77 000 00 00</div>
                <div style="font-size: 12px; color: rgba(255,255,255,0.7);">📧 contact@${nom.replace(/ /g,'').toLowerCase()}.com</div>
            </div>
        `;
    }
    
    if(type === "affiche") {
        largeur = 500; hauteur = 700;
        design = `
            <div style="background: ${couleur}; width: ${largeur}px; height: ${hauteur}px; display: flex; flex-direction: column; justify-content: center; align-items: center; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                <div style="font-size: 40px; margin-bottom: 20px;">🔥</div>
                <div style="font-size: 36px; font-weight: bold; color: white; text-align: center;">${nom}</div>
                <div style="font-size: 24px; margin: 20px 0; color: #FFD700;">PROMO EXCEPTIONNELLE</div>
                <div style="font-size: 16px; color: rgba(255,255,255,0.9);">Ne manquez pas cette opportunité !</div>
            </div>
        `;
    }
    
    document.getElementById('resultat').innerHTML = `
        <div style="overflow-x: auto; padding: 20px;">
            ${design}
        </div>
        <button class="telechargement" onclick="telechargerDesign()">📥 Télécharger le design</button>
        <p style="font-size: 12px; color: #888; margin-top: 10px;">⬆️ Clique droit → "Enregistrer l'image" ou capture d'écran</p>
    `;
}

function genererIA() {
    const description = document.getElementById('description').value;
    const type = document.getElementById('type').value;
    const nom = document.getElementById('nom').value;
    
    if(!description && !nom) {
        alert("❌ Décris ton design ou entre un nom !");
        return;
    }
    
    document.getElementById('resultat').innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 40px; margin-bottom: 10px;">🤖</div>
            <p>Génération IA en cours... (20-30 secondes)</p>
            <div style="width: 50px; height: 50px; border: 3px solid #ff6b6b; border-top-color: transparent; border-radius: 50%; margin: 20px auto; animation: spin 1s linear infinite;"></div>
        </div>
    `;
    
    setTimeout(() => {
        document.getElementById('resultat').innerHTML = `
            <div class="warning" style="background: rgba(0,100,0,0.2); border-color: #00aa00;">
                <p>⚠️ <strong>Mode Démonstration</strong></p>
                <p>Pour utiliser la VRAIE IA (DALL-E), il faut :</p>
                <ol style="text-align: left; margin: 10px 20px;">
                    <li>Aller sur <a href="https://platform.openai.com/api-keys" target="_blank">OpenAI</a></li>
                    <li>Créer un compte et obtenir une clé API</li>
                    <li>Ajouter la clé dans les variables d'environnement</li>
                </ol>
                <p style="margin-top: 10px;">💰 <strong>Coût :</strong> 0,02$ - 0,08$ par image (2-8 FCFA)</p>
                <p>📱 <strong>Alternative gratuite :</strong> Utilise le bouton "Template"</p>
            </div>
            <div style="background: #333; padding: 20px; border-radius: 10px; margin-top: 20px;">
                <p style="color: #ff8e53;">Exemple de design IA pour "${nom}" :</p>
                <div style="background: linear-gradient(135deg, ${document.getElementById('couleur').value}, #000); padding: 40px; border-radius: 15px; margin-top: 10px;">
                    <div style="font-size: 48px;">✨</div>
                    <div style="font-size: 24px; font-weight: bold; margin-top: 10px;">${nom}</div>
                    <div style="font-size: 14px; margin-top: 10px;">Design généré par IA</div>
                </div>
                <p style="font-size: 11px; color: #888; margin-top: 10px;">⬆️ Exemple visuel (démonstration)</p>
            </div>
        `;
    }, 2000);
}

function telechargerDesign() {
    alert("📸 Pour télécharger : Faites une capture d'écran (clic droit → Enregistrer l'image) ou utilisez l'outil capture de votre navigateur.");
}

# Ghid de Utilizare

Pentru a lansa aplicația, urmați pașii de mai jos:

1. **Clonare Repository:**
   - Clonează acest repository pe calculatorul local folosind următoarea comandă:
     ```
     git clone <url_repositoriu>
     ```

2. **Creare Bază de Date:**
   - Configurați un sistem de gestionare a bazelor de date.
   - Creați o bază de date cu numele `arte`.
   - Asigurați-vă că aveți un utilizator `root` cu acces la această bază de date.

3. **Descărcare Dependințe:**
   - După ce ați clonat repository-ul, navigați în directorul proiectului și executați comanda pentru a descărca dependințele:
     ```
     npm install
     ```

4. **Pornire Server:**
   - Pentru a porni serverul, executați următoarea comandă în terminal:
     ```
     set DEBUG=myapp:* & npm start
     ```

5. **Lansare site:**
   - Pentru lansarea site-ul, accesati in browser:
     ```
     http://localhost:3000/
     ```

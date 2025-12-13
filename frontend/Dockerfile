FROM node:20-alpine

# Dossier de travail dans le container
WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code
COPY . .

# Port Next.js
EXPOSE 3000

# Lancer Next en mode dev
CMD ["npm", "run", "dev"]

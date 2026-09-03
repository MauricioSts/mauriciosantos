# 🎴 Componente Lanyard - Pronto para Usar!

✅ **Instalação Completa!** O componente Lanyard está integrado e funcionando.

## 🎯 O que foi feito

1. ✅ Dependências instaladas (three, @react-three/fiber, @react-three/drei, @react-three/rapier)
2. ✅ Componente Lanyard criado com física 3D
3. ✅ Foto de perfil integrada (`/public/profile.jpeg`)
4. ✅ Textura da fita gerada (`/public/lanyard-texture.svg`)
5. ✅ Hero.jsx atualizado para usar o ProfileCard
6. ✅ Configuração do Vite atualizada

## 🚀 Como Usar

O componente já está ativo no Hero! Execute:

```bash
npm run dev
```

Depois abra o navegador e:
- 🖱️ **Arraste** o cartão com o mouse
- 📱 **Funciona** em mobile e desktop
- ✨ **Física realista** com gravidade e movimento suave

## ⚙️ Personalização

### Ajustar posição e física

Edite `src/components/ProfileCard.jsx`:

```jsx
<Lanyard 
  position={[0, 0, 24]}    // Posição da câmera [x, y, z]
  gravity={[0, -40, 0]}    // Gravidade [x, y, z] - aumente para mais peso
  fov={20}                 // Campo de visão (zoom)
  transparent={true}       // Fundo transparente
/>
```

### Mudar a textura da fita

**Opção 1: Editar o SVG**
- Abra `/public/lanyard-texture.svg`
- Mude as cores, texto, padrões

**Opção 2: Usar uma imagem PNG**
1. Crie/baixe uma imagem (512x512px)
2. Salve como `/public/lanyard.png`
3. Em `src/components/Lanyard.jsx` linha ~17, mude:
   ```jsx
   const lanyardTexture = useTexture('/lanyard.png');
   ```

### Mudar a foto do cartão

Substitua `/public/profile.jpeg` pela nova foto ou edite a linha ~16 em `Lanyard.jsx`:
```jsx
const profileTexture = useTexture('/sua-foto.jpg');
```

## 🎨 Cores da Fita

As cores atuais são esmeralda (#34d399) para combinar com seu tema. Para mudar:

1. Abra `/public/lanyard-texture.svg`
2. Encontre as cores no gradiente:
   - `#34d399` (esmeralda claro)
   - `#10b981` (esmeralda médio)
   - `#059669` (esmeralda escuro)
3. Substitua pelos códigos hex das suas cores

## 📱 Responsividade

O componente detecta automaticamente dispositivos móveis e ajusta:
- Qualidade de renderização
- Taxa de atualização da física
- Resolução da linha do cordão

## 🐛 Solução de Problemas

**Tela preta ou componente não aparece:**
- Verifique o console do navegador (F12)
- Certifique-se que `/public/profile.jpeg` existe
- Tente recarregar com Ctrl+Shift+R

**Performance lenta:**
- Reduza o `fov` para menos zoom
- Diminua a gravidade para movimento mais lento
- O componente já otimiza automaticamente para mobile

**Cartão não arrasta:**
- Certifique-se de clicar e segurar no cartão
- Verifique se o cursor muda para "grab"

## 🎉 Pronto!

Seu portfólio agora tem um cartão 3D interativo com física realista. Divirta-se arrastando o cartão!

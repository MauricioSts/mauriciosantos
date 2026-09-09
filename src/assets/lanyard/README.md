# Lanyard Assets

✅ **Configuração Completa!**

O componente Lanyard está funcionando com:
- **Foto de perfil**: `/public/profile.jpeg` (sua foto atual)
- **Textura da fita**: `/public/lanyard-texture.svg` (textura esmeralda gerada)

## 🎨 Personalização

### Alterar a textura da fita

Edite o arquivo `/public/lanyard-texture.svg` para mudar:
- Cores do gradiente
- Texto exibido
- Padrões e texturas

### Usar uma imagem PNG para a fita

1. Crie ou baixe uma imagem PNG (512x512px recomendado)
2. Salve como `/public/lanyard.png`
3. Edite `src/components/Lanyard.jsx` linha ~17:
   ```jsx
   const lanyardTexture = useTexture('/lanyard.png');
   ```

## 🎯 Funcionalidades

- ✅ Física realista com gravidade
- ✅ Arraste o cartão com o mouse
- ✅ Animação suave do cordão
- ✅ Responsivo (mobile e desktop)
- ✅ Efeitos de iluminação 3D

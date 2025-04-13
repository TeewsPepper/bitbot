# 🛠 Guía para Contribuir a [BitBot]

Como **maintainer**, agradezco tu interés en mejorar este proyecto. Sigue estas pautas para que tus contribuciones se integren sin problemas:

---

## 🚀 **Cómo Contribuir**

### 1. Haz Fork del Repositorio

1. Haz clic en **[Fork](https://github.com/TeewsPepper/bitbot/fork)** (botón arriba a la derecha en GitHub).  
2. Clona **tu fork** (solo si trabajas localmente):
     
   ```bash
   git clone https://github.com/tu-usuario/bitbot.git
   cd bitbot
   
   
### 2. Agregar repo original como upstream:
  1. Ejecuta:
   ```bash
   git remote add upstream https://github.com/TeewsPepper/bitbot.git
   ```

### 3. Elige un Issue Existente
1. Revisa los issues abiertos.
2. Espera mi confirmación (@maintainer) antes de empezar a codificar.



### 4. Crea una Rama Descriptiva
```bash
    git checkout -b tipo/descripcion-corta 
      # Ejemplos:  
      # fix/error-verificacion  
      # feat/comando-nuevo
```


### 5. Envía tu Pull Request (PR)

 1. Sincroniza con el repo principal (evita conflictos):
```bash
  git fetch upstream
  git merge upstream/main
```  

   
 2. Sube los cambios a tu fork:
```bash
   git push origin tu-rama
```
2. Crea el PR en GitHub:

    Usa este template: [.github/PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md)

    Vincula el issue con Closes #XX o Relacionado con #XX.
   

### 📌 **Ejemplo Práctico**  

**Situación**: Quieres solucionar el issue #15 ("El comando /verify no valida emails").  

1. **En tu PR**, incluye esto en la descripción:  
   
   Soluciona el problema de validación en `/verify`.  
   Closes #15 (esta etiqueta garantiza que una vez mergeados los cambios, el issue que abrimos previamente como tarea pendiente, se cierre automáticamente)

⚠️ Notas Clave
   
- Si un PR no resuelve completamente un issue, usa:
    ```markdown
    Relacionado con #55 
    ``` 
   - **Qué hace**: Vincula sin cerrar.
    - **Usado cuando**:
        - El PR es parcial.
        - El issue requiere más trabajo.
   

💡 Ejemplo de PR Perfecto

[FEATURE]: Añade comando /poll  

- Implementa votaciones con reacciones ✅/❌.  
- Incluye tests unitarios.  

Closes #78  # Cierra el issue de la solicitud original.  
Relacionado con #45  # Referencia una discusión previa.  

💬 ¿Necesitas Ayuda?
      Dudas técnicas: Abre un Discussion.
      Coordinación: Menciona @maintainer en tu PR/issue o en la discusión que abriste.


    

   

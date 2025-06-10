# Instruções de Instalação e Execução - DailyDo

## Configuração do Ambiente de Desenvolvimento

### 1. Instalação do Node.js
- Baixe e instale o Node.js versão 14 ou superior do site oficial: https://nodejs.org/
- Verifique a instalação executando: `node --version` e `npm --version`

### 2. Instalação do React Native CLI
```bash
npm install -g react-native-cli
```

### 3. Configuração para Android

#### Android Studio
1. Baixe e instale o Android Studio: https://developer.android.com/studio
2. Durante a instalação, certifique-se de instalar:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device

#### Configuração de Variáveis de Ambiente
Adicione as seguintes variáveis ao seu sistema:

**Windows:**
```
ANDROID_HOME = C:\Users\[SEU_USUARIO]\AppData\Local\Android\Sdk
```

**macOS/Linux:**
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### 4. Configuração do Java JDK
- Instale o Java JDK 8 ou 11
- Configure a variável JAVA_HOME apontando para o diretório de instalação do JDK

## Executando o Projeto DailyDo

### Passo 1: Preparar o Projeto
```bash
# Navegue até a pasta do projeto
cd DailyDo

# Instale as dependências
npm install
```

### Passo 2: Iniciar o Metro Bundler
```bash
# Em um terminal, execute:
npx react-native start
```

### Passo 3: Executar no Android
```bash
# Em outro terminal, execute:
npx react-native run-android
```

### Passo 4: Executar no iOS (apenas macOS)
```bash
# Para iOS, execute:
npx react-native run-ios
```

## Solução de Problemas Comuns

### Erro: "JAVA_HOME is not set"
**Solução:**
1. Instale o Java JDK 8 ou 11
2. Configure a variável JAVA_HOME
3. Reinicie o terminal/IDE

### Erro: "No emulators found"
**Solução:**
1. Abra o Android Studio
2. Vá em Tools > AVD Manager
3. Crie um novo Virtual Device
4. Inicie o emulador antes de executar o app

### Erro: "adb not found"
**Solução:**
1. Verifique se o Android SDK está instalado
2. Adicione o caminho do platform-tools ao PATH
3. Reinicie o terminal

### Erro de dependências
**Solução:**
```bash
# Limpe o cache do npm
npm cache clean --force

# Reinstale as dependências
rm -rf node_modules
npm install

# Para Android, limpe o cache do Gradle
cd android
./gradlew clean
cd ..
```

## Testando o Aplicativo

### Funcionalidades para Testar:
1. **Adicionar Tarefa**: Toque no botão "+" e adicione uma nova tarefa
2. **Marcar como Concluída**: Toque no círculo ao lado da tarefa
3. **Editar Tarefa**: Toque no texto da tarefa para editá-la
4. **Excluir Tarefa**: Toque no ícone da lixeira e confirme
5. **Persistência**: Feche e reabra o app para verificar se as tarefas foram salvas

### Verificações de Qualidade:
- [ ] Interface responsiva em diferentes tamanhos de tela
- [ ] Animações suaves ao marcar/desmarcar tarefas
- [ ] Confirmação antes de excluir tarefas
- [ ] Validação de entrada (não permitir tarefas vazias)
- [ ] Contador de tarefas atualizado corretamente

## Estrutura de Arquivos Importantes

```
DailyDo/
├── android/                 # Configurações específicas do Android
├── ios/                     # Configurações específicas do iOS
├── src/
│   ├── components/          # Componentes React Native
│   └── data/               # Lógica de persistência de dados
├── App.tsx                 # Componente principal
├── package.json            # Dependências e scripts
├── metro.config.js         # Configuração do Metro bundler
└── README.md              # Documentação do projeto
```

## Comandos Úteis

```bash
# Verificar saúde do ambiente React Native
npx react-native doctor

# Limpar cache do Metro
npx react-native start --reset-cache

# Gerar APK para distribuição (Android)
cd android
./gradlew assembleRelease

# Verificar dispositivos conectados
adb devices
```

## Próximos Passos

Após executar com sucesso o DailyDo, você pode:

1. **Personalizar**: Modificar cores, fontes e layout no arquivo de estilos
2. **Expandir**: Adicionar novas funcionalidades como categorias ou lembretes
3. **Otimizar**: Implementar testes automatizados
4. **Distribuir**: Gerar APK/IPA para compartilhar com outros usuários

## Suporte

Para problemas específicos:
1. Consulte a documentação oficial do React Native: https://reactnative.dev/
2. Verifique o arquivo de log de erros no terminal
3. Use o comando `npx react-native doctor` para diagnosticar problemas de ambiente


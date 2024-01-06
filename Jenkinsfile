pipeline {
  agent any

  environment {
    PATH = "$PATH:/usr/local/bin" // Ensure Fastlane is in the PATH
  }

  stages {
    stage('Checkout') {
      steps {
        script {
          checkout scm
        }
      }
    }

    stage('Install Dependencies') {
      steps {
        script {
          sh 'npm list -g'
          sh 'npm i -g yarn'
          sh 'yarn install'
        }
      }
    }

    stage('Install Fastlane') {
      steps {
        script {
          sh 'sudo gem install fastlane -NV'
        }
      }
    }

    stage('Run Fastlane') {
      steps {
        script {
          // Set environment variables for Fastlane to use
          env.KEYSTORE_PATH = credentials('your_keystore_path_id')
          env.KEYSTORE_ALIAS = credentials('your_keystore_alias_id')
          env.KEYSTORE_PASSWORD = credentials('your_keystore_password_id')
          env.KEY_PASSWORD = credentials('your_key_password_id')

          // Run Fastlane lane for Android build
          sh 'cd android && fastlane generate_apk'
        }
      }
    }
  }
}

# API de Livros

API em Flask para disponibilizar os dados de um catalogo de livros a outros sistemas. O endpoint `GET /livros` retorna tres livros em JSON.

## Executar

Ative o ambiente virtual, instale as dependencias e inicie a API:

```powershell
cd api-livros-flask
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

A API fica disponivel em `http://127.0.0.1:5000/livros`.
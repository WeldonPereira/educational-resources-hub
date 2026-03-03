import time
import logging
import json
from google import genai 
from app.core.config import settings

logger = logging.getLogger("ai_service")

class AIService:
    @staticmethod
    def generate_description(title: str, resource_type: str):
        start_time = time.time()
        
        
        if settings.AI_PROVIDER == "gemini" and settings.AI_API_KEY:
            try:
                client = genai.Client(api_key=settings.AI_API_KEY)
                
                prompt = f"""
                Atue como um Especialista em Educação Digital.
                Para o material abaixo, gere uma descrição e 3 tags estratégicas.
                Título: "{title}"
                Tipo: "{resource_type}"
                Responda estritamente com este objeto JSON:
                {{
                    "description": "Uma frase curta e profissional resumindo o conteúdo.",
                    "tags": ["Tag1", "Tag2", "Tag3"]
                    }}
                """

                response = client.models.generate_content(
                    model="gemini-3-flash-preview", 
                    contents=prompt
                )

                json_text = response.text.strip()
                if "```json" in json_text:
                    json_text = json_text.split("```json")[1].split("```")[0].strip()
                elif "```" in json_text:
                    json_text = json_text.split("```")[1].split("```")[0].strip()

                data = json.loads(json_text)
                
                latency = round(time.time() - start_time, 2)
                logger.info(f'[AI SUCCESS] Title="{title}", Latency={latency}s')
                return data

            except Exception as e:
                logger.error(f"[AI ERROR] Falha no Gemini: {str(e)}")

        time.sleep(1.5) 
        
        mock_response = {
            "description": f"Material focado no estudo de {title}, estruturado para facilitar o aprendizado do tipo {resource_type.lower()}.",
            "tags": [title.lower()[:10], "educação", resource_type.lower()],
        }

        latency = round(time.time() - start_time, 2)
        logger.info(f'[AI MOCK] Title="{title}", Latency={latency}s')
        
        return mock_response
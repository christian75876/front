import { fetchApi } from "../../../helpers/fetch-api";
import { QuillDeltaToHtmlConverter  } from 'quill-delta-to-html';
import styles from "./challenge-by-id.css";

export function ChallengeByIdScene(id) {
    
    let pageContent = `
        <h1 id="challenge-title" class="${styles.title}"></h1>
        <h2 id="description" class="${styles.description}"></h2>
        <div id="editor" class="${styles.editor}"></div>
        
    `;

    let logic = async () => {
        // make server request
        try {
            const resp = await fetchApi(`http://localhost:4000/api/challenges/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });
            console.log(resp);
            document.getElementById('challenge-title').innerText =resp.title;
            const description = resp.description.replace(/"/g, '');
            document.getElementById('description').innerText = `Description: ${description}`;
            
            
            const converter = new QuillDeltaToHtmlConverter(JSON.parse(resp.content).ops, {});
            const htmlContent = converter.convert();
            
            const editor = document.getElementById('editor');
            console.log(htmlContent);
            editor.innerHTML = htmlContent;
        } catch (error) {
            console.error(error, "from ChallengeByIdScene");
        }
    };
    return {
        pageContent,
        logic
    };
}

import React, {useState} from 'react'

function Create(){

    const [header, setHeader] = useState('');
    const [tag, setTag] = useState('');


    function createInput(e, param){
        e.preventDefault();
        var blogContent = document.getElementById('blogContent');
        const blogParagraph = document.createElement(param);
        
        if (param === 'textarea'){
            blogParagraph.id = 'textarea_' + blogContent.length;
            blogParagraph.rows = 5;
            blogParagraph.cols = 100;
            blogParagraph.value = '';
            blogParagraph.name = 'textarea_' + blogContent.length;
        }
        else if (param === 'input'){
            blogParagraph.id = 'image_' + blogContent.length;
            blogParagraph.type = "file";
            blogParagraph.value = '';
            blogParagraph.name = 'image_' + blogContent.length;
        }

        blogContent.appendChild(blogParagraph);

        const deleteElement = document.createElement('button');
        deleteElement.id = 'delete_' + blogContent.length;
        deleteElement.innerHTML = 'X';
        
        deleteElement.onclick = function deleteInput(e){
            e.preventDefault();
            var element = document.getElementById(blogParagraph.id);
            element.remove();
            element = document.getElementById(deleteElement.id);
            element.remove();    
        };

        blogContent.append(deleteElement);

        // get number of child elements created under the blogContent id element
        //console.log(blogContent.getElementsByTagName('*').length);
    }

    
    function submitForm(e){
        e.preventDefault();
        const formOutput = document.getElementById('blogContent');
        console.log(formOutput);
        const formData = new FormData(formOutput);
        
        // iterate through entries...
        for (var pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]['name']);
        }
    }
     
    function onChange(e){
        if (e.target.name === 'header'){
            setHeader((...prev) => e.target.value);
        } else if (e.target.name === 'tag'){
            setTag((...prev) => e.target.value);
        }

    }

    return (
        <div>
            <h1>Create a Blog</h1>
            <form  onSubmit={submitForm}>
                {/* to pass an event and parameter, use () => function */}
                <button onClick={(event) => createInput(event, 'textarea')} >Add Text Input</button>
                <button onClick={(event) => createInput(event, 'input')}>Add Image Input</button>
                <input type="submit" value="Save Blog" />
            </form>
            <form id="blogContent">
                <label>Header</label>
                <input 
                    type="text" 
                    placeholder="header" 
                    value={header}
                    name="header"
                    onChange={(e) => onChange(e)}
                />
                <label>Tag</label>
                <input 
                    type="text" 
                    placeholder="tag" 
                    value={tag}
                    name="tag"
                    onChange={(e) => onChange(e)}
                />
            </form>
        </div>
    )
}

export default Create
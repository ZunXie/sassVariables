
import fs from 'fs'
import postcss from 'postcss';
import scssSyntax from 'postcss-scss';

export default function sassVariables(options = {}) {
    const { sassfilepath = '', inputfilepath = '', globalName = '' } = options

    return {
        name: 'sassVariables',
        async transform(src, id) {
            if(id === inputfilepath.replace(/\\/g, '/')){
                let sassVariables = await getVariables(sassfilepath)

                let inserJs = `;window.${globalName || `sassVariables`} = ${JSON.stringify(sassVariables)}`

                let res = src + inserJs
            
                return {
                    code: res
                }
            }
        },
    }
}
function getVariables(filepath){
    return new Promise((resolve,reject) => {
        fs.readFile(filepath, (err, data) => {
            if (err) {
                reject(err)
            }
            let variables = {}
         
            const result = postcss().process(data.toString(), {
                syntax: scssSyntax,
            }).root
            
            result.walkDecls(decl => {
                const variableName = decl.prop.replace('$', '')
                variables[variableName] = decl.value;
            });
            resolve(variables)
        })
    })
}
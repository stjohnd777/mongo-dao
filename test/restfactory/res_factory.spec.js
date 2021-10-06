const REST = require('../../src/api/rest_factory');
const http = require('http')

describe("RestFactory", ()=> {

    async function waitingOperation (waitFor, returnData, isRejected = false,e) {
        return new Promise( (resolve,reject)=>{

            setTimeout( ()=>{
                isRejected ? reject(e) : resolve(returnData)
            }, waitFor)
        });
    }

    it("it should work", () => {

        const PORT = 7767

        const get = {
            method: 'GET',
            path: 'noun/:id',
            provider: async (req,res) => {

                try {
                    const id = req.params.id
                    const ret =await waitingOperation(1000, id)
                    res.status = http.STATUS_CODES.OK
                    return res.json(ret)
                }catch (e){

                }finally {

                }
            }
        }
        const post = new RestEndpoint('POST','noun',(res,req)=>{

            let noun = req.body
            res.status = 201
            return res.json(ret)

        })
        const put = new RestEndpoint('PUT','noun',()=>{

        })
        const del = new RestEndpoint('DELETE','noun',()=>{

        })

        const patch = new RestEndpoint('PATCH','noun',()=>{

        })

        const endpoints = [get,post,put,patch,del]

        const m0 = ()=>{

        }
        const m1 = ()=>{

        }
        const m2 = ()=>{

        }

        const middleware = [m0,m1,m2]

        const service = serviceRestServiceFactory('test',endpoints,middleware)

        service.start(PORT, serviceUpCallback)

    })

})
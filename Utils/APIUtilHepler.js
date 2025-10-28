const {expect} = require('@playwright/test')
class APIUtils
{

constructor(apicontext)
{
    this.apicontext = apicontext;
}

async Postcall(url,payload={},headerspart ={})
{
   const postcallresponsebody =  await this.apicontext.post(url,
    {
        data:payload,
        headers:headerspart
    });
    
   const body = await postcallresponsebody.json();
   expect(postcallresponsebody.ok()).toBeTruthy()
   const statuscode = postcallresponsebody.status();
   return {status:statuscode,body};
}

async Getcall(url,Qparams={},headerspart={})
{
    const getcallresponsebody = await this.apicontext.get(url,{params:Qparams,headers:headerspart});
    expect(await getcallresponsebody.ok()).toBeTruthy()
    const body = await getcallresponsebody.json()
    const statuscode = getcallresponsebody.status();
    return {status:statuscode,body};
}




}

module.exports = {APIUtils};
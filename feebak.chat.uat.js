let conversationId = '';
var surveyLink = '';
function feebakSaveConversation(e) {
    conversationId = e.data.data.conversationId;
}


// function to be called upon chat end
async function feebakOfferSurvey(data) {
    // Call API to get the link
    data.ConversationID = conversationId;

    // change the link to app.feebak.com and remove the comment when going to prod
    return await fetch('https://dev2.feebak.com/v1/websurvey/link', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((data) => {
        if (!data.Success) {
            console.error(data.Message);
            return null;
        } else {
            surveyLink = data.Data;
            return surveyLink;
        }
    });
}

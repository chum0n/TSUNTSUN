package body

type VerifyRequestBody struct {
	IDToken  string
	ClientID string
}

type VerifyResponseBody struct {
	Iss     string
	Sub     string
	Aud     string
	Exp     int
	Iat     int
	Nonce   string
	Amr     []string
	Name    string
	Picture string
	Email   string
}

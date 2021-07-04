package controllers

import (
	"fmt"

	"github.com/labstack/echo"
	"github.com/yot-sailing/TSUNTSUN/body"
	"github.com/yot-sailing/TSUNTSUN/domain"
	"github.com/yot-sailing/TSUNTSUN/interfaces/database"
	"github.com/yot-sailing/TSUNTSUN/usecase"
)

type UserController struct {
	Interactor usecase.UserInteractor
}

func NewUserController(sqlHandler database.SqlHandler) *UserController {
	return &UserController{
		Interactor: usecase.UserInteractor{
			UserRepository: &database.UserRepository{
				SqlHandler: sqlHandler,
			},
		},
	}
}

func (controller *UserController) Create(c echo.Context) {
	u := domain.User{}
	c.Bind(&u)
	controller.Interactor.Add(u)
	createdUsers := controller.Interactor.GetInfo()
	c.JSON(201, createdUsers)
	return
}

// 該当のLINEユーザーIDを持つユーザーが存在すればその情報を取得。存在しなければ作成したのちその情報を取得。
func (controller *UserController) PrepareUser(userLine body.VerifyResponseBody) domain.User {
	fmt.Println("controller層のuserLine", userLine)
	user := controller.Interactor.Prepare(userLine)
	return user
}

func (controller *UserController) GetUser() []domain.User {
	res := controller.Interactor.GetInfo()
	return res
}

func (controller *UserController) Delete(id int) {
	controller.Interactor.Delete(id)
}

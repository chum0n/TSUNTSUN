package controllers

import (
	"github.com/labstack/echo"
	"github.com/yot-sailing/TSUNTSUN/domain"
	"github.com/yot-sailing/TSUNTSUN/interfaces/database"
	"github.com/yot-sailing/TSUNTSUN/usecase"
)

type TsundokuController struct {
	Interactor usecase.TsundokuInteractor
}

func NewTsundokuController(sqlHandler database.SqlHandler) *TsundokuController {
	return &TsundokuController{
		Interactor: usecase.TsundokuInteractor{
			TsundokuRepository: &database.TsundokuRepository{
				SqlHandler: sqlHandler,
			},
		},
	}
}

func (controller *TsundokuController) CreateTsundoku(c echo.Context, userID int) {
	tsundoku := domain.Tsundoku{}
	c.Bind(&tsundoku)
	controller.Interactor.Add(tsundoku, userID)
	createdTsundokus := controller.Interactor.GetInfo(userID)
	c.JSON(201, createdTsundokus)
	return
}

func (controller *TsundokuController) GetTsundoku(userID int) []domain.Tsundoku {
	res := controller.Interactor.GetInfo(userID)
	return res
}

func (controller *TsundokuController) Delete(id int) {
	controller.Interactor.Delete(id)
}

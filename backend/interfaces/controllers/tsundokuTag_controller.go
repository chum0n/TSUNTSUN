package controllers

import (
	"github.com/labstack/echo"
	"github.com/yot-sailing/TSUNTSUN/domain"
	"github.com/yot-sailing/TSUNTSUN/interfaces/database"
	"github.com/yot-sailing/TSUNTSUN/usecase"
)

type TsundokuTagController struct {
	Interactor usecase.TsundokuTagInteractor
}

func NewTsundokuTagController(sqlHandler database.SqlHandler) *TsundokuTagController {
	return &TsundokuTagController{
		Interactor: usecase.TsundokuTagInteractor{
			TsundokuTagRepository: &database.TsundokuTagRepository{
				SqlHandler: sqlHandler,
			},
		},
	}
}

func (controller *TsundokuTagController) CreateTsundokuTag(c echo.Context, tsundokuID int, userID int, tagID int) {
	tsundokuTag := domain.TsundokuTag{
		TsundokuID: tsundokuID,
		TagID:      tagID,
		UserID:     userID,
	}
	controller.Interactor.Add(tsundokuTag)
	createdTsundokuTag := controller.Interactor.GetInfo(userID)
	c.JSON(201, createdTsundokuTag)
	return
}

// userIDからレコードを取得
func (controller *TsundokuTagController) GetTsundokuTags(userID int) []domain.TsundokuTag {
	res := controller.Interactor.GetInfo(userID)
	return res
}

// tsundokuIDとuserIDからレコードを取得
func (controller *TsundokuTagController) GetTsundokuTagsByTsundokuIDandUserID(tsundokuID, userID int) []domain.TsundokuTag {
	res := controller.Interactor.GetInfoByMultiIDs(tsundokuID, userID)
	return res
}

func (controller *TsundokuTagController) Delete(id int) {
	controller.Interactor.Delete(id)
}

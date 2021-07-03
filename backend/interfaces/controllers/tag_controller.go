package controllers

import (
	"github.com/labstack/echo"
	"github.com/yot-sailing/TSUNTSUN/domain"
	"github.com/yot-sailing/TSUNTSUN/interfaces/database"
	"github.com/yot-sailing/TSUNTSUN/usecase"
)

type TagController struct {
	Interactor usecase.TagInteractor
}

func NewTagController(sqlHandler database.SqlHandler) *TagController {
	return &TagController{
		Interactor: usecase.TagInteractor{
			TagRepository: &database.TagRepository{
				SqlHandler: sqlHandler,
			},
		},
	}
}

func (controller *TagController) CreateTag(c echo.Context, userID int, tsundokuID int) {
	tag := domain.Tag{}
	c.Bind(&tag)
	controller.Interactor.Add(tag)
	createdTags := controller.Interactor.GetInfo(userID)
	c.JSON(201, createdTags)
	return
}

func (controller *TagController) GetTags(userID int) []domain.Tag {
	res := controller.Interactor.GetInfo(userID)
	return res
}

func (controller *TagController) Delete(id int) {
	controller.Interactor.Delete(id)
}

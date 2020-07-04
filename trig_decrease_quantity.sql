-- ================================================
-- Template generated from Template Explorer using:
-- Create Trigger (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- See additional Create Trigger templates for more
-- examples of different Trigger statements.
--
-- This block of comments will not be included in
-- the definition of the function.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE TRIGGER Trg_OrderDetails_Products 
ON  dbo.OrderDetails
FOR INSERT,UPDATE
AS 
BEGIN
	DECLARE @Quantity INT
	DECLARE @IDProduct INT

	SELECT @IDProduct=IDProduct, @Quantity=Quantity
	FROM Inserted


	UPDATE dbo.Products SET Quantity=(Quantity-@Quantity) WHERE IDProduct=@IDProduct

END


select*From Products where IDManufacturer=1

Update Products set Quantity=10 where IDManufacturer=1